# Client-Webpage
Client-Webpage consists of an Angular-Webpage, where User can find themselfes in an integrated map. 


## INSTALLATION
Before running, you need to install npm, as well as required packages. 
Search for a download of npm online and install it on your machine. \
Then install the Angular CLI by using `npm install -g @angular/cli` in a terminal. \
Navigate to the Client-Webpage Folder by Command Line and run `npm install` to install all required packages. A "node_modules" Folder will appear and resolve the  dependencies. 

## IMPORTANT
If not already provided by the host, you need to set the environment variables for the mqtt-broker. Templates can be found in src/environments and need to be filled and renamed to `environment.ts` and `environment.prod.ts` in the same directory.
On top of that you need to adjust the `env` file in the root folder to provide your google maps api key. 

## BUILD
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## RUN
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

