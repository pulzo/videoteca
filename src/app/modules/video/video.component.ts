import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { VideoService } from 'src/app/core/services/video.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VozIA, MakeVideoRequest } from 'src/app/models/voz-ia';

import { timer, Subscription } from 'rxjs';
import { switchMap, takeWhile } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})


export class VideoComponent implements OnInit {


  form!: FormGroup;
  voces: VozIA[] = [];
  loading = false;
  secciones = [
    { key: 'bogota', value: 'Bogotá' },
    { key: 'pulzo_valor', value: 'Pulzo Valor' },
    { key: 'futbol', value: 'Fútbol' },
    { key: 'deportes', value: 'Deportes' },
    { key: 'tecnologia', value: 'Tecnología' },
    { key: 'bajo_sospecha', value: 'Bajo Sospecha' },
    { key: 'generales', value: 'Noticias Generales' }
  ];

  private subscription!: Subscription;
  status: string = ""
  postId: string | null  = ""
  video_url = ""

  constructor(private fb: FormBuilder, private videoService: VideoService,private authService: AuthService) {
    
  }

  ngOnInit(): void {
    this.buildForm();
    this.getVocesIA();
  }

  progresoActual = 0;
  labelPasoActual = '';
  esPasoLento = false;

  orientaciones = [
    { key: 'vertical', value: 'Vertical (9:16)' },
    { key: 'horizontal', value: 'Horizontal (16:9)' }
  ];
  private readonly PASOS: { key: string; label: string; progreso: number; lento?: boolean }[] = [
    { key: 'processing',                        label: 'Paso 1/8 — Iniciando...',                  progreso: 10 },
    { key: 'Creando Guion',                     label: 'Paso 2/8 — Creando guión...',              progreso: 20 },
    { key: 'Creando Audio',                     label: 'Paso 3/8 — Generando audio...',            progreso: 35 },
    { key: 'Creando Clips',                     label: 'Paso 4/8 — Creando clips de video...',     progreso: 50 },
    { key: 'Creando Overlayer titulo y franja', label: 'Paso 5/8 — Agregando título y franja...',  progreso: 62 },
    { key: 'Asignando audio al video',          label: 'Paso 6/8 — Asignando audio...',            progreso: 75 },
    { key: 'Renderizando video',                label: 'Paso 7/8 — Renderizando video...',         progreso: 85, lento: true },
    { key: 'Video Finalizado',                  label: 'Paso 8/8 — ¡Video listo!',                 progreso: 100 },
  ];

  private actualizarPaso(status: string): void {
    const paso = this.PASOS.find(p => status.includes(p.key));
    if (paso) {
      this.progresoActual = paso.progreso;
      this.labelPasoActual = paso.label;
      this.esPasoLento = !!paso.lento;
    } else {
      this.labelPasoActual = status;
      this.esPasoLento = false;
    }
  }

  private buildForm(): void {
    this.form = this.fb.group({
      link: ['', [Validators.required, Validators.minLength(5)]],
      voiceId: ['', Validators.required],
      sectionId: ['', Validators.required],
      orientacion: ['vertical', Validators.required]  // ← agrega esto
    });
  }

  private getVocesIA(): void {
    this.videoService.listarVocesIA().subscribe({
      next: (data) => this.voces = data,
      error: (err) => console.error('Error listando voces IA', err)
    });
  }

  obtenerEstado(): void {
    this.subscription = timer(0, 10000)
      .pipe(
        switchMap(() => this.videoService.getStatus(this.postId)),
        takeWhile((response: any) => {
          this.status = response.status;
          this.actualizarPaso(response.status);

          if (response.videopath) {
            this.video_url = response.videopath;
          }

          // ✅ si ya terminó, cerramos overlay aquí mismo
          if (response.status === 'Video Finalizado') {
            this.loading = false;
          }

          return response.status !== 'Video Finalizado';
        }, true)
      )
      .subscribe({
        next: (response) => {
          // ya todo se maneja en el takeWhile
        },
        error: (err) => {
          console.error('Error consultando estado', err);
          this.loading = false;
        },
        complete: () => {
          this.loading = false; // por si acaso
        }
      });
  }

  getPostId(url: string): string | null {
    const match = url.match(/PP[A-Z0-9]+/i);
    return match ? match[0] : null;
  }

  generarVideo(): void {
    if (this.form.invalid) return;

    this.loading = true;                           // abre overlay
    this.progresoActual = 5;
    this.labelPasoActual = 'Paso 1/8 — Iniciando...';
    this.esPasoLento = false;
    this.postId = this.getPostId(this.form.value.link);

    const payload: MakeVideoRequest = {
      link: this.form.value.link,
      voz_id: this.form.value.voiceId,
      section: this.form.value.sectionId,
      type_video: this.form.value.orientacion,  // ← agrega esto
    };

    console.log(payload);

    this.videoService.makeVideo(payload).subscribe({
      next: (data) => {
        this.postId = this.getPostId(this.form.value.link);
        this.obtenerEstado();
      },
      error: (err) => {
        console.error('Error en el request', err);
        this.loading = false;                      // cierra overlay en error

        Swal.fire({                                // este Swal de error sí se queda
          icon: 'error',
          title: 'Error',
          text: '¿Está arriba la aplicación?'
        });
      }
    });
  }

}
