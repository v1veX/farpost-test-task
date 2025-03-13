import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AuthSubmissionService {
    async submit(email: string | null | undefined, password:  string | null | undefined) {
        const response = await fetch('https://www.vl.ru/authtestcase/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const responseObject = await response.json();

        if (responseObject?.token) {
            console.log(`Welcome, ${responseObject.user.name}!`);
        }
        else {
            console.error('Invalid email or password!');
        }
    }
}