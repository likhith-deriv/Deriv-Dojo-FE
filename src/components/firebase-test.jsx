import React from 'react';
import { db } from '../firebase-config';
import { collection, addDoc, updateDoc, doc, deleteDoc, onSnapshot } from 'firebase/firestore';
import CircularLoader from './circular-loader';

const FirebaseTest = () => {
    const [name, setName] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [users, setUsers] = React.useState([]);
    const [id_name_changing, setIdNameChanging] = React.useState('');
    const [new_name, setNewName] = React.useState('');
    const users_collection = collection(db, 'users');
    // delete local is_loading after implementation app status to store
    const [is_loading, setIsloading] = React.useState(true);

    const addUser = async () => {
        setIsloading(true);
        await addDoc(users_collection, { name, company, test: { test: 'Test' } });
        setIsloading(false);
    };

    const deleteUser = async id => {
        setIsloading(true);
        const user_doc = doc(db, 'users', id);
        await deleteDoc(user_doc);
        setIsloading(false);
    };

    const changeNameHandler = async id => {
        if (!new_name) return;
        setIsloading(true);
        const user_doc = doc(db, 'users', id);
        await updateDoc(user_doc, { name: new_name });
        setNewName('');
        setIdNameChanging('');
        setIsloading(false);
    };

    React.useEffect(() => {
        let unsubscribe;
        const getUsers = async () => {
            unsubscribe = await onSnapshot(users_collection, data => {
                setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
                setIsloading(false);
            });
        };
        getUsers();
        return unsubscribe;
    }, []);

    return (
        <div>
            <h1>Deriv Dojo</h1>
            <input placeholder='Enter the name' value={name} onChange={e => setName(e.currentTarget.value)} />
            <input placeholder='Enter the compamy' value={company} onChange={e => setCompany(e.currentTarget.value)} />
            <button onClick={addUser}>Add user</button>
            {is_loading && <CircularLoader />}
            {users.map(user => (
                <div key={user.id}>
                    {id_name_changing === user.id ? (
                        <div>
                            <input
                                placeholder={user.name}
                                value={new_name}
                                onChange={e => setNewName(e.currentTarget.value)}
                            />
                            <button onClick={() => changeNameHandler(user.id)}>Change name</button>
                            <button onClick={() => setIdNameChanging('')}>Cancel</button>
                        </div>
                    ) : (
                        <div>
                            <span onDoubleClick={() => setIdNameChanging(user.id)}>{user.name}</span>
                            <button onClick={() => deleteUser(user.id)}>Delete user</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FirebaseTest;
