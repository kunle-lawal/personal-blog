export const uploadImage = (url) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        var storeageRef = firebase.storeage().ref('me');
        storeageRef.putString(url, 'base64').then(() => {
            console.log('uploadedFile');
        })
    }
}