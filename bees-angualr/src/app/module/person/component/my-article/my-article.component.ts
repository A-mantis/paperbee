import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../person.service';
import { ApiException } from 'src/app/util/network/network.exception';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { LocalStorage } from 'src/app/app.localStorage';

@Component({
  selector: 'app-my-article',
  templateUrl: './my-article.component.html',
  styleUrls: ['./my-article.component.css']
})
export class MyArticleComponent implements OnInit {

  constructor(private personService: PersonService, private message: NzMessageService, private modalService: NzModalService, private localStorage: LocalStorage) { }

  ngOnInit() {
    this.initQuery();
  }

  total = 0;
  pageSize = 8;
  pageIndex = 1;
  dataSet = []

  initQuery() {
    this.personService.getMyArticleList(this.pageIndex, this.pageSize).subscribe(response => {
      this.dataSet = response.data.result;
      this.total = response.data.count;
    }, (error) => {
      var errorMsg = '网络异常，请稍后再试';
      if (error instanceof ApiException) {
        errorMsg = error.message;
      }
      this.message.error(errorMsg);
    })
  }

  onDelete(rowId) {
    this.modalService.confirm({
      nzTitle: '你确定要删除该文章吗?',
      nzOkText: 'Yes',
      nzCancelText: 'No',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.personService.deleteArticleByRowId(rowId).subscribe(response => {
          this.initQuery();
        }, (error) => {
          var errorMsg = '网络异常，请稍后再试';
          if (error instanceof ApiException) {
            errorMsg = error.message;
          }
          this.message.error(errorMsg);
        })
      }
    });
  }

  openArticle(data) {
    window.open("/content?id=" + data.id + "&title=" + data.title);
  }

  edit(data: any) {
    this.localStorage.setObject("articleInfo", data);
    window.open("/editArticle", '_self');
  }

}
