import {doc, setDoc} from "firebase/firestore";

export const setNewUserInDatabase = async (firestore, auth) => {
    const user = auth.currentUser;
    if (!Object.keys(firestore).length || !Object.keys(firestore).length) {
        return
    }

    return await setDoc(doc(firestore, 'users', user.displayName), {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        avatar: '',
    })
}

export const windowSize = (setWidth) => {
    window.addEventListener('resize', () =>
        setWidth(window.innerWidth)
    )
}


export function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const validateEmailForm = (email, setEmailError) => {
    if (!email.length) {
        setEmailError('Required');
    } else {
        setEmailError('Invalid email address');
    }
}

export const validatePasswordForm = (password, setPassError) => {
    if (!password.length) {
        setPassError('Required');
    } else if (password.length < 8) {
        setPassError('Password is too short');
    } else {
        setPassError('Invalid password');
    }
}
