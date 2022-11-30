"use strict";(self.webpackChunkapp_museu=self.webpackChunkapp_museu||[]).push([[3],{2003:(fe,A,s)=>{s.r(A),s.d(A,{HomeModule:()=>de});var b=s(6895),d=s(4144),f=s(4859),J=s(782),m=s(9549),L=s(3546),Y=s(1572),S=s(3162),n=s(4006),e=s(4650),Z=s(7364),p=s(3060),h=s(7009);let M=(()=>{class t{constructor(r,o,a,l,u){this.fb=r,this.userService=o,this.route=a,this.snackbar=l,this.router=u,this.canLoad=!1}ngOnInit(){this.recoverPwdForm=this.fb.group({password:[null,[n.kI.pattern(/(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)]],confirmPassword:[null,[n.kI.required]]}),this.getId()}getId(){this.route.params.subscribe({next:r=>this.id=r.id,error:r=>{this.errorMessage=r.message,console.log(this.errorMessage=r.message)},complete:()=>this.canLoad=!0})}handleRecoverPassword(){if(this.recoverPwdForm.valid){const r=this.recoverPwdForm.get("password")?.value;console.log(r),this.userService.recoverPassword(this.id,r).subscribe({next:o=>console.log(o),error:o=>{this.errorMessage=o.message,this.snackbar.open(this.errorMessage,"okay")},complete:()=>{this.snackbar.open("Senha alterada com sucesso","okay"),this.router.navigate(["/"])}})}}get differentPwd(){return this.recoverPwdForm.get("password")?.value===this.recoverPwdForm.get("confirmPassword")?.value&&this.recoverPwdForm.touched}get errorPwd(){return this.recoverPwdForm.get("password")?.errors}}return t.\u0275fac=function(r){return new(r||t)(e.Y36(n.qu),e.Y36(Z.K),e.Y36(p.gz),e.Y36(h.ux),e.Y36(p.F0))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-recover-password"]],decls:16,vars:2,consts:[[1,"wrapper",3,"formGroup","ngSubmit"],[1,"div-img"],["src","https://media.discordapp.net/attachments/944008601163431986/1042960285914382397/visita_guiada_ver.1.png","alt","logo do aplicativo",1,"img-login"],["matInput","","formControlName","password"],["matInput","","formControlName","confirmPassword"],["mat-flat-button","","color","primary",3,"disabled"]],template:function(r,o){1&r&&(e.TgZ(0,"form",0),e.NdJ("ngSubmit",function(){return o.handleRecoverPassword()}),e.TgZ(1,"div",1),e._UZ(2,"img",2),e.qZA(),e.TgZ(3,"p")(4,"mat-form-field")(5,"mat-label"),e._uU(6,"Digite sua nova senha"),e.qZA(),e._UZ(7,"input",3),e.qZA()(),e.TgZ(8,"p")(9,"mat-form-field")(10,"mat-label"),e._uU(11,"Confirme a senha"),e.qZA(),e._UZ(12,"input",4),e.qZA()(),e.TgZ(13,"p")(14,"button",5),e._uU(15,"Alterar Senha"),e.qZA()()()),2&r&&(e.Q6J("formGroup",o.recoverPwdForm),e.xp6(14),e.Q6J("disabled",!o.differentPwd&&!o.errorPwd))},dependencies:[m.KE,m.hX,d.Nt,f.lW,n._Y,n.Fj,n.JJ,n.JL,n.sg,n.u],styles:[".wrapper[_ngcontent-%COMP%], .div-img[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center}.div-img[_ngcontent-%COMP%]   .img-login[_ngcontent-%COMP%]{margin-top:50px;margin-bottom:30px;width:180px}button[_ngcontent-%COMP%]{width:100%}"]}),t})(),O=(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(r){return new(r||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-home"]],decls:1,vars:0,template:function(r,o){1&r&&e._UZ(0,"router-outlet")},dependencies:[p.lC]}),t})();var c=s(5412);let Q=(()=>{class t{constructor(r,o,a){this.fb=r,this.userService=o,this.snackbar=a}ngOnInit(){this.forgotPwdForm=this.fb.group({email:[null,[n.kI.required,n.kI.email]]})}sendEmail(){let r=this.forgotPwdForm.get("email")?.value;this.userService.sendEmail(r).subscribe({next:o=>{this.snackbar.open(("Um e-mail de recupera\xe7\xe3o de senha foi enviado para o seguinte endere\xe7o: "+r).concat("..."),"okay")},error:o=>this.snackbar.open(o.message,"okay"),complete:()=>this.snackbar.open("Confira sua caixa de entrada!","okay")})}get errorEmail(){return this.forgotPwdForm.get("email")?.errors}}return t.\u0275fac=function(r){return new(r||t)(e.Y36(n.qu),e.Y36(Z.K),e.Y36(h.ux))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-forgot-password-dialog"]],decls:16,vars:3,consts:[["mat-dialog-title",""],[3,"formGroup"],["matInput","","formControlName","email"],["align","end"],["mat-button","","mat-dialog-close",""],["mat-button","","cdkFocusInitial","",3,"mat-dialog-close","disabled","click"]],template:function(r,o){1&r&&(e.TgZ(0,"h1",0),e._uU(1,"Recupera\xe7\xe3o de Senha"),e.qZA(),e.TgZ(2,"mat-dialog-content")(3,"h3"),e._uU(4,"Para continuar digite seu e-mail"),e.qZA(),e.TgZ(5,"form",1)(6,"p")(7,"mat-form-field")(8,"mat-label"),e._uU(9,"E-mail"),e.qZA(),e._UZ(10,"input",2),e.qZA()()()(),e.TgZ(11,"mat-dialog-actions",3)(12,"button",4),e._uU(13,"Cancelar"),e.qZA(),e.TgZ(14,"button",5),e.NdJ("click",function(){return o.sendEmail()}),e._uU(15,"Enviar"),e.qZA()()),2&r&&(e.xp6(5),e.Q6J("formGroup",o.forgotPwdForm),e.xp6(9),e.Q6J("mat-dialog-close",!0)("disabled",o.errorEmail))},dependencies:[m.KE,m.hX,d.Nt,f.lW,n._Y,n.Fj,n.JJ,n.JL,n.sg,n.u,c.ZT,c.uh,c.xY,c.H8]}),t})();var C=s(2340),q=s(8505),T=s(529);const E=C.N.URL_BASE;let R=(()=>{class t{constructor(r,o){this.http=r,this.userService=o,this.hide=!0}postLogin(r){return this.http.post(`${E}/person/login`,r,{observe:"response"}).pipe((0,q.b)(a=>{const l=a.headers.get("x-access-token")??"";this.token=l,this.userService.savUserToken(l)}))}}return t.\u0275fac=function(r){return new(r||t)(e.LFG(T.eN),e.LFG(Z.K))},t.\u0275prov=e.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();const B=C.N.URL_BASE;let z=(()=>{class t{constructor(r,o){this.httpClient=r,this.userService=o}auth(r){return this.httpClient.post(`${B}/person/login`,r,{observe:"response"}).pipe((0,q.b)(o=>{const a=o.headers.get("x-access-token")??"";this.userService.savUserToken(a)}))}}return t.\u0275fac=function(r){return new(r||t)(e.LFG(T.eN),e.LFG(Z.K))},t.\u0275prov=e.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var P=s(7392),y=s(4850);function H(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1,"Campo obrigat\xf3rio"),e.qZA())}function D(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1,"e-mail inv\xe1lido"),e.qZA())}function G(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1,"Campo obrigat\xf3rio"),e.qZA())}function X(t,i){1&t&&(e.TgZ(0,"span"),e._uU(1,"Login"),e.qZA())}function $(t,i){1&t&&e._UZ(0,"mat-progress-bar",17)}const K=function(){return["signup"]};let W=(()=>{class t{constructor(r,o,a,l,u,g){this.formBuilder=r,this.loginService=o,this.authService=a,this.router=l,this.snackBar=u,this.dialog=g,this.hidePwd=!0,this.isLoading=!1}ngOnInit(){this.signinForm=this.formBuilder.group({email:["",[n.kI.required,n.kI.email]],password:["",[n.kI.required]]})}openSnackBar(r,o){this.snackBar.open(r,o)}openForgotPasswordDialog(){this.dialog.open(Q)}login(){const r=this.signinForm.getRawValue();this.isLoading=!0,this.loginService.postLogin(r).subscribe({next:o=>{console.log("Esse usu\xe1rio se logou: ",o)},complete:()=>{console.log("Usu\xe1rio Logado"),this.router.navigate(["menu"])},error:o=>{this.isLoading=!1,this.openSnackBar(o.error.message,"x")}})}}return t.\u0275fac=function(r){return new(r||t)(e.Y36(n.qu),e.Y36(R),e.Y36(z),e.Y36(p.F0),e.Y36(h.ux),e.Y36(c.uw))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-login"]],decls:35,vars:13,consts:[[1,"content-wrapper"],[1,"div-img"],["src","https://media.discordapp.net/attachments/944008601163431986/1047307240748613652/visita-guiada.png","alt","logo do museu do Ipiranga",1,"img-login"],[1,"logo-text"],[1,"form-login"],[3,"formGroup"],["appearance","outline",1,"form-field-email"],["matInput","","formControlName","email",1,"input-email"],[4,"ngIf"],["appearance","outline",1,"form-field-pwd"],["matInput","","formControlName","password",1,"input-pwd",3,"type"],["mat-icon-button","","matSuffix","",3,"click"],["mat-raised-button","","color","primary",1,"button-login",3,"disabled","click"],[4,"ngIf","ngIfElse"],["type","button","mat-flat-button","",1,"button-pwd",3,"click"],["type","button","mat-raised-button","",1,"button-register",3,"routerLink"],["loader",""],["mode","indeterminate"]],template:function(r,o){if(1&r&&(e.TgZ(0,"div",0)(1,"div",1),e._UZ(2,"img",2),e.TgZ(3,"mat-label",3),e._uU(4,"VISITA GUIADA"),e.qZA()(),e.TgZ(5,"div",4)(6,"form",5)(7,"p")(8,"mat-form-field",6)(9,"mat-label"),e._uU(10," E-mail "),e.qZA(),e._UZ(11,"input",7),e.YNc(12,H,2,0,"mat-error",8),e.YNc(13,D,2,0,"mat-error",8),e.qZA()(),e.TgZ(14,"p")(15,"mat-form-field",9)(16,"mat-label"),e._uU(17," Senha "),e.qZA(),e._UZ(18,"input",10),e.YNc(19,G,2,0,"mat-error",8),e.TgZ(20,"button",11),e.NdJ("click",function(){return o.hidePwd=!o.hidePwd}),e.TgZ(21,"mat-icon"),e._uU(22),e.qZA()()()(),e.TgZ(23,"p")(24,"button",12),e.NdJ("click",function(){return o.login()}),e.YNc(25,X,2,0,"span",13),e.qZA()(),e._UZ(26,"mat-divider"),e.TgZ(27,"p")(28,"button",14),e.NdJ("click",function(){return o.openForgotPasswordDialog()}),e._uU(29,"Esqueceu a senha?"),e.qZA()(),e.TgZ(30,"p")(31,"button",15),e._uU(32,"Criar nova conta"),e.qZA()()()()(),e.YNc(33,$,1,0,"ng-template",null,16,e.W1O)),2&r){const a=e.MAs(34);let l,u,g;e.xp6(6),e.Q6J("formGroup",o.signinForm),e.xp6(6),e.Q6J("ngIf",null==(l=o.signinForm.get("email"))||null==l.errors?null:l.errors.required),e.xp6(1),e.Q6J("ngIf",null==(u=o.signinForm.get("email"))||null==u.errors?null:u.errors.email),e.xp6(5),e.Q6J("type",o.hidePwd?"password":"text"),e.xp6(1),e.Q6J("ngIf",null==(g=o.signinForm.get("password"))||null==g.errors?null:g.errors.required),e.xp6(1),e.uIk("aria-label","Hide password")("aria-pressed",o.hidePwd),e.xp6(2),e.Oqu(o.hidePwd?"visibility_off":"visibility"),e.xp6(2),e.Q6J("disabled",o.isLoading),e.xp6(1),e.Q6J("ngIf",!o.isLoading)("ngIfElse",a),e.xp6(6),e.Q6J("routerLink",e.DdM(12,K))}},dependencies:[m.TO,m.KE,m.hX,m.R9,b.O5,p.rH,d.Nt,f.lW,n._Y,n.Fj,n.JJ,n.JL,n.sg,n.u,P.Hw,y.d,S.pW],styles:[".content-wrapper[_ngcontent-%COMP%]{margin:30px;display:flex;flex-direction:column;align-items:center}.div-img[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center}.div-img[_ngcontent-%COMP%]   .img-login[_ngcontent-%COMP%]{margin-top:10px;width:200px}.div-img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{mix-blend-mode:color-burn}.div-img[_ngcontent-%COMP%]   .logo-text[_ngcontent-%COMP%]{font-size:22px;font-family:fantasy;margin-top:5px;margin-bottom:30px}.form-login[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center}button[_ngcontent-%COMP%]{width:195px}.button-register[_ngcontent-%COMP%]{background-color:#3cb371}mat-form-field[_ngcontent-%COMP%]{width:195px;-ms-box-sizing:content-box;box-sizing:content-box;-webkit-box-sizing:content-box}"]}),t})();const j=C.N.URL_BASE;let V=(()=>{class t{constructor(r){this.http=r}addNewUser(r){return this.http.post(`${j}/person/register`,r)}}return t.\u0275fac=function(r){return new(r||t)(e.LFG(T.eN))},t.\u0275prov=e.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var _=s(9602),N=s(1094);function ee(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1,"Campo obrigat\xf3rio"),e.qZA())}function te(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1,"Nome inv\xe1lido"),e.qZA())}function oe(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1,"Selecione uma data"),e.qZA())}function re(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1,"Campo obrigat\xf3rio"),e.qZA())}function ne(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1,"Telefone inv\xe1lido"),e.qZA())}function ie(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1,"Campo obrigat\xf3rio"),e.qZA())}function ae(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1,"e-mail inv\xe1lido"),e.qZA())}function se(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1,"Campo obrigat\xf3rio"),e.qZA())}function le(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1," Senha inv\xe1lida"),e.qZA())}function me(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1,"As senhas precisam ser iguais"),e.qZA())}const ue=function(){return[""]},pe=[{path:"",component:O,children:[{path:"",component:W},{path:"signup",component:(()=>{class t{constructor(r,o,a,l){this.formBuilder=r,this.newUserService=o,this.snackBar=a,this.route=l,this.hidePwd=!0}ngOnInit(){this.newUserForm=this.formBuilder.group({name:["",[n.kI.required,n.kI.minLength(3),n.kI.maxLength(20),n.kI.pattern("^[a-zA-Z_ ]*$")]],birthDate:["",[n.kI.required]],phone:["",[n.kI.required,n.kI.minLength(11),n.kI.maxLength(11),n.kI.pattern("^[0-9]*$")]],email:["",[n.kI.required,n.kI.email]],password:["",[n.kI.required,n.kI.minLength(6),n.kI.maxLength(20),n.kI.pattern(/(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)]],confirmPassword:["",[n.kI.required,n.kI.minLength(6),n.kI.maxLength(20)]]})}openSnackBar(r,o){this.snackBar.open(r,o)}signUp(){if(this.newUserForm.get("password")?.value!==this.newUserForm.get("confirmPassword")?.value&&(this.newUserForm.get("password")?.setValue(""),this.newUserForm.get("confirmPassword")?.setValue(""),this.openSnackBar("As senhas est\xe3o diferentes","X")),this.newUserForm.valid){const r=this.newUserForm.getRawValue();this.newUserService.addNewUser(r).subscribe({complete:()=>{console.log("Usu\xe1rio Cadastrado"),this.route.navigate([""])},error:o=>this.snackBar.open(o.error.message,"okay")})}}}return t.\u0275fac=function(r){return new(r||t)(e.Y36(n.qu),e.Y36(V),e.Y36(h.ux),e.Y36(p.F0))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-sign-up"]],decls:53,vars:23,consts:[[1,"content-wrapper"],[3,"formGroup","submit"],[1,"register-div"],[1,"title-label"],["appearance","outline"],["matInput","","formControlName","name",1,"input-name"],[4,"ngIf"],["matInput","","formControlName","birthDate","readonly","",3,"matDatepicker"],["matSuffix","",3,"for"],["picker",""],["matInput","","formControlName","phone","mask","(00) 0 0000-0000"],["matInput","","formControlName","email"],["matInput","","formControlName","password",3,"type"],["mat-icon-button","","matSuffix","",3,"click"],["matInput","","formControlName","confirmPassword",3,"type"],["mat-raised-button","","color","primary",1,"register-button"],[3,"routerLink"]],template:function(r,o){if(1&r&&(e.TgZ(0,"div",0)(1,"form",1),e.NdJ("submit",function(){return o.signUp()}),e.TgZ(2,"div",2)(3,"p")(4,"mat-label",3),e._uU(5,"Registre-se!"),e.qZA()(),e.TgZ(6,"mat-form-field",4)(7,"mat-label"),e._uU(8,"Nome"),e.qZA(),e._UZ(9,"input",5),e.YNc(10,ee,2,0,"mat-error",6),e.YNc(11,te,2,0,"mat-error",6),e.qZA(),e.TgZ(12,"mat-form-field",4)(13,"mat-label"),e._uU(14,"Data de nascimento"),e.qZA(),e._UZ(15,"input",7),e.YNc(16,oe,2,0,"mat-error",6),e._UZ(17,"mat-datepicker-toggle",8)(18,"mat-datepicker",null,9),e.qZA(),e.TgZ(20,"mat-form-field",4)(21,"mat-label"),e._uU(22,"Telefone"),e.qZA(),e._UZ(23,"input",10),e.YNc(24,re,2,0,"mat-error",6),e.YNc(25,ne,2,0,"mat-error",6),e.qZA(),e.TgZ(26,"mat-form-field",4)(27,"mat-label"),e._uU(28,"E-mail"),e.qZA(),e._UZ(29,"input",11),e.YNc(30,ie,2,0,"mat-error",6),e.YNc(31,ae,2,0,"mat-error",6),e.qZA(),e.TgZ(32,"mat-form-field",4)(33,"mat-label"),e._uU(34,"Senha"),e.qZA(),e._UZ(35,"input",12),e.TgZ(36,"button",13),e.NdJ("click",function(){return o.hidePwd=!o.hidePwd}),e.TgZ(37,"mat-icon"),e._uU(38),e.qZA()(),e.YNc(39,se,2,0,"mat-error",6),e.YNc(40,le,2,0,"mat-error",6),e.qZA(),e.TgZ(41,"mat-form-field",4)(42,"mat-label"),e._uU(43,"Confirmar senha"),e.qZA(),e._UZ(44,"input",14),e.TgZ(45,"button",13),e.NdJ("click",function(){return o.hidePwd=!o.hidePwd}),e.TgZ(46,"mat-icon"),e._uU(47),e.qZA()(),e.YNc(48,me,2,0,"mat-error",6),e.qZA(),e.TgZ(49,"button",15),e._uU(50,"Cadastrar"),e.qZA(),e.TgZ(51,"a",16),e._uU(52,"J\xe1 se cadastrou? Clique aqui!"),e.qZA()()()()),2&r){const a=e.MAs(19);let l,u,g,F,v,k,I,x,w,U;e.xp6(1),e.Q6J("formGroup",o.newUserForm),e.xp6(9),e.Q6J("ngIf",null==(l=o.newUserForm.get("name"))||null==l.errors?null:l.errors.required),e.xp6(1),e.Q6J("ngIf",(null==(u=o.newUserForm.get("name"))?null:u.errors)&&(null==(u=o.newUserForm.get("name"))||null==u.errors?null:u.errors.required)),e.xp6(4),e.Q6J("matDatepicker",a),e.xp6(1),e.Q6J("ngIf",null==(g=o.newUserForm.get("birthDate"))||null==g.errors?null:g.errors.required),e.xp6(1),e.Q6J("for",a),e.xp6(7),e.Q6J("ngIf",null==(F=o.newUserForm.get("phone"))||null==F.errors?null:F.errors.required),e.xp6(1),e.Q6J("ngIf",(null==(v=o.newUserForm.get("phone"))?null:v.errors)&&!(null!=(v=o.newUserForm.get("phone"))&&null!=v.errors&&v.errors.required)),e.xp6(5),e.Q6J("ngIf",null==(k=o.newUserForm.get("email"))||null==k.errors?null:k.errors.required),e.xp6(1),e.Q6J("ngIf",null==(I=o.newUserForm.get("email"))||null==I.errors?null:I.errors.email),e.xp6(4),e.Q6J("type",o.hidePwd?"password":"text"),e.xp6(1),e.uIk("aria-label","Hide password")("aria-pressed",o.hidePwd),e.xp6(2),e.Oqu(o.hidePwd?"visibility_off":"visibility"),e.xp6(1),e.Q6J("ngIf",null==(x=o.newUserForm.get("password"))||null==x.errors?null:x.errors.required),e.xp6(1),e.Q6J("ngIf",(null==(w=o.newUserForm.get("password"))?null:w.errors)&&!(null!=(w=o.newUserForm.get("password"))&&null!=w.errors&&w.errors.required)),e.xp6(4),e.Q6J("type",o.hidePwd?"password":"text"),e.xp6(1),e.uIk("aria-label","Hide password")("aria-pressed",o.hidePwd),e.xp6(2),e.Oqu(o.hidePwd?"visibility_off":"visibility"),e.xp6(1),e.Q6J("ngIf",(null==(U=o.newUserForm.get("password"))?null:U.value)!==(null==(U=o.newUserForm.get("confirmPassword"))?null:U.value)),e.xp6(3),e.Q6J("routerLink",e.DdM(22,ue))}},dependencies:[m.TO,m.KE,m.hX,m.R9,b.O5,p.yS,d.Nt,f.lW,n._Y,n.Fj,n.JJ,n.JL,n.sg,n.u,P.Hw,_.Mq,_.hl,_.nW,N.hx],styles:[".content-wrapper[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;margin:30px}.register-div[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center}mat-form-field[_ngcontent-%COMP%]{width:195px;-ms-box-sizing:content-box;box-sizing:content-box;-webkit-box-sizing:content-box}.title-label[_ngcontent-%COMP%]{font-family:Roboto;font-size:22px;color:#3f51b5}.register-button[_ngcontent-%COMP%]{width:100%}a[_ngcontent-%COMP%]{padding-top:13px;font-size:12px}"]}),t})()},{path:"recover-password/:id",component:M}]}];let ge=(()=>{class t{}return t.\u0275fac=function(r){return new(r||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[p.Bz.forChild(pe),p.Bz]}),t})();var ce=s(3238);let de=(()=>{class t{}return t.\u0275fac=function(r){return new(r||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({providers:[_.FA],imports:[m.lN,b.ez,ge,d.c,f.ot,J.N6,n.UX,L.QW,P.Ps,y.t,_.FA,ce.XK,N.yI.forRoot(),h.ZX,Y.Cq,S.Cv,c.Is]}),t})()}}]);