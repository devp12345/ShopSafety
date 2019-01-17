export interface User {
    id?: String;
    email?: String;
    photoURL?: String;
    fullName?: String;
    displayName?: String;
    userNumber?: String;
    school?: String;
    inClassTraining?: [Boolean, Boolean, Boolean, Boolean, Boolean, Boolean, Boolean, Boolean, Boolean, Boolean];
    onlineTraining?: [Boolean, Boolean, Boolean, Boolean, Boolean, Boolean, Boolean, Boolean, Boolean, Boolean];
    tests?: [Boolean, Boolean, Boolean, Boolean, Boolean, Boolean, Boolean, Boolean, Boolean, Boolean];
    isStudent?: Boolean
}