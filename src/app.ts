import { ProjectInput } from './components/project-input';
import { ProjectList } from './components/project-list';

  const prjInput = new ProjectInput();
  const activeProjectList = new ProjectList("active");
  const finishedProjectList = new ProjectList("finished");
  /*
-in nmespace adjust outfile to a file to contactate dist file for to output and change module to amd
- for modules you will use not amdd otherwise 3s2015 and commented out outfile also in html file 
you will dlete defer and add type="module to script tag
  */
