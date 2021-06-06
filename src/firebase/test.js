import firebase from 'firebase/app';
import 'firebase/firestore';

const firestore = firebase.firestore();

firestore.collection('users').doc('nI3wrI38hBi7wVTToRCY').collection('cartItems').doc('et3hAxrXcJ8s8xSV4s1G');
firestore.doc('/users/nI3wrI38hBi7wVTToRCY/cartItems/et3hAxrXcJ8s8xSV4s1G');
firestore.collection('/users/nI3wrI38hBi7wVTToRCY/cartItems')