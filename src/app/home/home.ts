import { Component } from '@angular/core';
import {EnsemblService} from '../service/ensembl-service';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Species } from './../model/species';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  speciesList: Species[] = [];
  selectedSpecie: Species | null = null;
  chromosomes: { name: string; length: number }[] = [];
  constructor(
    private ensemblService :EnsemblService
  ) {}

  ngOnInit(): void {
    // Call the service method we already created
    this.ensemblService.getSpeciesInfo().subscribe(
      (data: any) => {
        //this.speciesList = data.species; // Populate dropdown
        this.speciesList = data.species.map((s: any) => ({
          common_name: s.common_name,
          display_name: s.display_name,
          name: s.name,
          taxon_id: s.taxon_id
        }));
      },
      (error) => {
        console.error('Error fetching species:', error);
      }
    );
  }

  onSpeciesChange() {
    if (this.selectedSpecie) {
      this.ensemblService.getAssemblyInfo(this.selectedSpecie.common_name)
        .subscribe(response => {
          this.chromosomes = response.top_level_region
            /*.filter((region: any) => region.coord_system === 'chromosome')
            .map((region: any) => ({
              name: region.name,
              length: region.length
            }));*/
        });
    }

  }

}
