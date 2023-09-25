import {Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {ArticleService} from "../../shared/services/article.service";
import {ArticleType} from "../../../types/article.type";
import {AuthService} from "../../core/auth/auth.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {RequestService} from "../../shared/services/request.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MainComponent implements OnInit {

  @ViewChild('popupService') popupService!: TemplateRef<ElementRef>;
  @ViewChild('popup') popup!: TemplateRef<ElementRef>;
  dialogRef: MatDialogRef<any> | null = null;
  serviceInput: string | null = null;
  services = [
    {
      image: 'service1.png',
      title: 'Создание сайтов',
      description: 'В краткие сроки мы создадим качественный и самое главное продающий сайт для продвижения Вашего бизнеса!',
      price: '7 500 Р',
    },
    {
      image: 'service2.png',
      title: 'Продвижение',
      description: 'Вам нужен качественный SMM-специалист или грамотный таргетолог? Мы готовы оказать Вам услугу “Продвижения” на наивысшем уровне!',
      price: '3 500 Р',
    },
    {
      image: 'service3.png',
      title: 'Реклама',
      description: 'Без рекламы не может обойтись ни один бизнес или специалист. Обращаясь к нам, мы гарантируем быстрый прирост клиентов за счёт правильно настроенной рекламы.',
      price: '1 000 Р',
    },
    {
      image: 'service4.png',
      title: 'Копирайтинг',
      description: 'Наши копирайтеры готовы написать Вам любые продающие текста, которые не только обеспечат рост охватов, но и помогут выйти на новый уровень в продажах.',
      price: '750 Р',
    },
  ];
  banners = [
    {
      image: 'banner1.png',
      header: 'Предложение месяца',
      title: 'Продвижение в Instagram для вашего бизнеса <span>-15%</span>!',
      service: 'Продвижение'
    },
    {
      image: 'banner2.png',
      header: 'Акция',
      title: 'Нужен грамотный <span>копирайтер</span>?',
      description: 'Весь декабрь у нас действует акция на работу копирайтера.',
      service: 'Копирайтинг'
    },
    {
      image: 'banner3.png',
      header: 'Новость дня',
      title: '<span>6 место</span> в ТОП-10 SMM-агенств Москвы!',
      description: 'Мы благодарим каждого, кто голосовал за нас!',
      service: 'Создание сайтов'
    },
  ];

  reviews = [
    {
      image: 'review1.png',
      name: 'Станислав',
      description: 'Спасибо огромное АйтиШторму за прекрасный блог с полезными статьями! Именно они и побудили меня углубиться в тему SMM и начать свою карьеру.'
    },
    {
      image: 'review2.png',
      name: 'Алёна',
      description: 'Обратилась в АйтиШторм за помощью копирайтера. Ни разу ещё не пожалела! Ребята действительно вкладывают душу в то, что делают, и каждый текст, который я получаю, с нетерпением хочется выложить в сеть.'
    },
    {
      image: 'review3.png',
      name: 'Мария',
      description: 'Команда АйтиШторма за такой короткий промежуток времени сделала невозможное: от простой фирмы по услуге продвижения выросла в мощный блог о важности личного бренда. Класс!'
    },
  ];

  customOptionsReviews: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    margin: 24,
    dots: false,
    navSpeed: 800,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
    },
    nav: true
  };

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    autoplaySpeed: 3000,
    autoplayTimeout: 6000,
    autoplayHoverPause: false,
    responsive: {
      0: {
        items: 1
      },
    },
  };

  constructor(private articleService: ArticleService,
              private authService: AuthService,
              private dialog: MatDialog,
              private router: Router,
              private requestService: RequestService,
              private fb: FormBuilder) {
  }
  articles: ArticleType[] = [];
  typeSearch = new FormControl('Создание сайтов');
  ngOnInit() {
    this.articleService.getTopArticles()
      .subscribe((data: ArticleType[]) => {
        this.articles = data;
      })
  }
  openServicePopup(serviceTitle: string | null) {
    if (serviceTitle) {
      this.phoneForm.value.service = serviceTitle;
      this.dialogRef = this.dialog.open(this.popupService);
      this.serviceInput = serviceTitle;
      this.typeSearch  = new FormControl(serviceTitle)
    }
  }

  closePopup() {
    this.dialogRef?.close();
    this.router.navigate(['/']);
    this.phoneForm.reset();
  }

  submitApplication() {
    console.log(this.phoneForm.value.name, this.phoneForm.value.phone, this.phoneForm.value.service, this.phoneForm.value.type)
    if (this.phoneForm.value.name && this.phoneForm.value.phone && this.phoneForm.value.service && this.phoneForm.value.type) {
      this.requestService.getNewRequestPhone(this.phoneForm.value.name, this.phoneForm.value.phone, this.phoneForm.value.service, this.phoneForm.value.type)
        .subscribe(() => {
          this.dialogRef?.close();
          this.dialogRef = this.dialog.open(this.popup);
          this.phoneForm.reset();
        })
    }
  }

  phoneForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^([А-ЯA-Z][а-яa-zА-ЯA-Z\-]{1,})?(\s[А-ЯA-Z][а-яa-zА-ЯA-Z\-]{1,})?(\s[А-ЯA-Z][а-яa-zА-ЯA-Z\-]{1,})?$/)]],
    phone: ['', [Validators.required, Validators.pattern(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{11}$/)]],
    service: ['Сервис'],
    type: ['order'],
  })

}
