import { ProjectStatus } from './projectStatus';

export class ProjectModel {
  constructor(
    public email: string = '',
    public projectData: ProjectData = new ProjectData()
  ) {}
}

class ProjectData {
  constructor(
    public name: string = '',
    public status: ProjectStatus = ProjectStatus.Stable
  ) {}
}
