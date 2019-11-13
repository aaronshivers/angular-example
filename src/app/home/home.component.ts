import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../api.service';
import { takeUntil } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ],
})
export class HomeComponent implements OnInit {
  products = [];

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.apiService
    .sendGetRequest()
    .pipe(takeUntil(this.destroy$))
    .subscribe((res: HttpResponse<any>) => {
      // console.log(res);
      this.products = res.body;
    });
  }

  public firstPage() {
    this.products = [];
    this.apiService
    .sendGetRequestToUrl(this.apiService.first)
    .pipe(takeUntil(this.destroy$))
    .subscribe((res: HttpResponse<any>) => {
      console.log(res);
      this.products = res.body;
    });
  }

  public nextPage() {
    if (this.apiService.next !== undefined && this.apiService.next !== '') {
      this.products = [];
      this
      .apiService
      .sendGetRequestToUrl(this.apiService.next)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<any>) => {
        // console.log(res);
        this.products = res.body;
      });
    }
  }

  public previousPage() {
    if (this.apiService.prev !== undefined && this.apiService.prev !== '') {
      this.products = [];
      this
      .apiService
      .sendGetRequestToUrl(this.apiService.prev)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.products = res.body;
      });
    }
  }

  public lastPage() {
    if (this.apiService.last !== undefined && this.apiService.last !== '') {
      this.products = [];
      this
      .apiService
      .sendGetRequestToUrl(this.apiService.last)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.products = res.body;
      });
    }
  }

  public onPaginatorChange(paginatorInfo) {
    this.apiService.getPaginatorInfo(paginatorInfo);
  }
}
