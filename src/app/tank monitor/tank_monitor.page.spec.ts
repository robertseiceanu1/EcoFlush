import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { TankMonitorPage } from './tank_monitor.page';

describe('TankMonitorPage', () => {
  let component: TankMonitorPage;
  let fixture: ComponentFixture<TankMonitorPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TankMonitorPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TankMonitorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
