export interface project {
    id: number,
    project_id: string,
    name: string,
    domain: string,
    members: string[],
    owner: string,
    type: string,
    valid: boolean
  }

  export interface pageView {
    id: number,
    page: string,
    referrer: string,
    country_id: number,
    os_id: number,
    browser_id: number,
    view_time: string,
    visitor_id: number,
    project_id: string,  
    countries?: {id: number, name: string},
    operating_systems?: {id: number, name: string},
    browsers?: {id: number, name: string}
  }


  export interface datasets {
    data: number[],
    backgroundColor: string,
    borderColor: string,
    borderWidth: number,
    fill: boolean,
    pointBackgroundColor: string,
    pointBorderWidth: number,
    pointRadius: number,
  
  }

  export interface chart {
    label: string,
    labels: string[],
    datasets: datasets[]
  }

  export interface Dialog extends HTMLDialogElement {
    showModal(): void;
    close(returnValue?: string): void;
  }