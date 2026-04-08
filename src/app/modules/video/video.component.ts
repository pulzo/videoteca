import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { VideoService } from 'src/app/core/services/video.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VozIA, MakeVideoRequest } from 'src/app/models/voz-ia';

import { interval, Subscription } from 'rxjs';
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


  private buildForm(): void {
    this.form = this.fb.group({
      link: ['', [Validators.required, Validators.minLength(5)]],
      voiceId: ['', Validators.required],
      sectionId: ['', Validators.required]
    });
  }

  private getVocesIA(): void {
    this.videoService.listarVocesIA().subscribe({
      next: (data) => this.voces = data,
      error: (err) => console.error('Error listando voces IA', err)
    });
  }

  obtenerEstado():void {
    this.subscription = interval(10000) // ⏱️ cada 10 segundos
      
      .pipe(
        
        switchMap(() => this.videoService.getStatus(this.postId)),
        takeWhile((response: any) => {
          this.status = response.status;
          return response.status !== 'Video Finalizado';
        }, true) // 👈 incluye el último valor
      )
      .subscribe({
        next: (response) => {
          this.status = response.status;
          Swal.close();
          Swal.fire({
            title: 'El proceso esta: ',
            text: this.status,
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => Swal.showLoading()
          });

           // ✅ AQUÍ capturas la URL
          if (response.status === 'Video Finalizado') {
            this.video_url = response.videopath; // 👈 ajusta el nombre según backend
            console.log(this.video_url)
          }

          console.log('Estado:', response);
        },
        error: (err) => {
          console.error('Error consultando estado', err);
        },
        complete: () => {
          Swal.close();
          console.log('✅ Video finalizado, se detiene polling');
          

        }
      });

  }

  getPostId(url: string): string | null {
    const match = url.match(/PP\d+/);
    return match ? match[0] : null;
  }

  generarVideo(): void {
    if (this.form.invalid) return;

    this.loading = true;

    Swal.fire({
      title: 'Generando video',
      text: 'Este proceso puede demorar mucho, ten paciencia',
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => Swal.showLoading()
    });

    const userLogged = this.authService.getUserLogged();
    const payload: MakeVideoRequest = {
      link: this.form.value.link,
      voz_id: this.form.value.voiceId,
      section: this.form.value.sectionId,
    };

    //buscamos el ID del articulo
    console.log(payload)

    this.videoService.makeVideo(payload).subscribe({
      next: (data) => {
        this.loading = false;
        
        //Check status
        this.postId = this.getPostId(this.form.value.link);
        this.obtenerEstado();
      },
      error: (err) => {
        console.error('Error enviando en el request al back, esta arriba la aplicacion?', err);
        this.loading = false;

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error Enviando en el request al back, esta arriba la aplicacion?'
        });
      }
    });
  }

}
