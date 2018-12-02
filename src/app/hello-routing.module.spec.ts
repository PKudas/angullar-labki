import { HelloRoutingModule } from './hello-routing.module';

describe('HelloRoutingModule', () => {
  let helloRoutingModule: HelloRoutingModule;

  beforeEach(() => {
    helloRoutingModule = new HelloRoutingModule();
  });

  it('should create an instance', () => {
    expect(helloRoutingModule).toBeTruthy();
  });
});
