import { action, makeAutoObservable, makeObservable, observable } from "mobx";

export default class ActivityStore {
    title = 'Hello from MobX!';

    constructor() {
        makeAutoObservable(this)
        // makeObservable(this, {
        //     title: observable,
        //     setTitle: action
        // })
    }

    setTitle = () => {
        this.title = this.title + '!';
    }
}