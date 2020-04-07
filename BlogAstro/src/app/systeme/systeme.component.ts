import { Component, OnInit, TemplateRef } from '@angular/core';
import { PlanetsService } from '../service/planets.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-systeme',
  templateUrl: './systeme.component.html',
  styleUrls: ['./systeme.component.css']
})
export class SystemeComponent implements OnInit {

  public planet: any;
  modalRef: BsModalRef;

  constructor(public planetsService: PlanetsService, private modalService: BsModalService) { }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>, value) {
    console.log(value + 'name plante')
    this.callPlanets(value);
    this.modalRef = this.modalService.show(template);
  }

  callPlanets(planet) {
    this.planetsService.getPlanet(planet).subscribe(res => {
      console.log(res)
      this.planet = res;
    },
      error => {

      })
  }
}
