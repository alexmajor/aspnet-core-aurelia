import {autoinject} from 'aurelia-dependency-injection';
import {Project, ProjectItem, CLIOptions, UI} from 'aurelia-cli';
 
@autoinject()
export default class ViewModelGenerator 
{
  constructor(private project: Project, private options: CLIOptions, private ui: UI) { }
 
  execute() 
  {
    var self = this;
 
    return self.ui
      .ensureAnswer(self.options.args[0], 'What would you like to call the new view model?')
      .then(name => {
         
          let fileName = self.project.makeFileName(name);
          let className = self.project.makeClassName(name);
 
          return self.ui.ensureAnswer(self.options.args[1], 'Where would you like to create the new view model (this is root level)?')
          .then(path => {
 
                self.project.locations.push(self.project.requestedPath = ProjectItem.directory(path));
 
                self.project.requestedPath.add(
                    ProjectItem.text(`${fileName}.ts`, self.generateSource(className)),
                    ProjectItem.text(`${fileName}.html`, self.generateViewSource())
                );
 
                return self.project.commitChanges()
                    .then(() => self.ui.log(`Created ${fileName}.`));
          });                
      });
  }
 
  generateSource(className) 
  {
return `export class ${className}ViewModel
{
    message = 'Hello from ${className}ViewModel !';
 
    constructor()
    {
         
    }
}
`
  }
 
  generateViewSource() 
  {
      return '<template>${message}</template>'
  }
}
