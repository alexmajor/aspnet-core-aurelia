import { NavigationInstruction, Next, Redirect } from 'aurelia-router';
import { AuthenticationService } from './../services/authentication-service';
import { autoinject } from 'aurelia-framework';

@autoinject
export class AuthorizeStep {

    private authenticationService: AuthenticationService;

    constructor(authenticationService: AuthenticationService) {
        this.authenticationService = authenticationService;
    }

    run(navigationInstruction: NavigationInstruction, next: Next): Promise<any> {
        if (navigationInstruction.getAllInstructions().some(i => i.config.settings.auth)) {
            var isLoggedIn = this.authenticationService.isAuthenticated(); //insert magic here;
            if (!isLoggedIn) {
                return next.cancel(new Redirect('login'));
            }
        }
        return next();
    }
}
