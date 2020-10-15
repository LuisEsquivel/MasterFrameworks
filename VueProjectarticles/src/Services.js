

import axios from 'axios';

export default class Services {

    get = async function (url) {

        return new Promise((resolve) => {

            axios.get(url)
                .then(res => {
                    resolve(res);
                }).catch(() => {
                    resolve([]);
                })

        });

    }

    getById = async function (url) {
        return new Promise((resolve) => {

            axios.get(url)
                .then(res => {
                    resolve(res);
                }).catch(() => {
                    resolve([]);
                });

        });
    }

    search = async function (url) {
        return new Promise( (resolve) =>{
             axios.get(url)
                  .then(res =>{
                      resolve(res);
                  }).catch( () =>{
                      resolve([]);
                  })
        });
    }


    create = async function (url, objeto) {

        return new Promise((resolve) => {
            axios.post(url, objeto)
                .then(res => {
                    resolve(res);
                }).catch(() => {
                    resolve([]);
                })
        });
    }



    update = async function (url, objeto) {

        return new Promise((resolve) => {
            axios.put(url, objeto)
                .then(res => {
                    resolve(res);
                }).catch(() => {
                    resolve([]);
                })
        });

    }



    delete = async function (url, id) {

        return new Promise((resolve) => {
            axios.delete(url, id)
                .then(res => {
                    resolve(res);
                }).catch(() => {
                    resolve([]);
                })
        });

    }



    getPlaceHolder = async function (url) {
        return new Promise((resolve) => {
            axios.get(url)
                .then(res => {
                    resolve(res);
                }).catch(() => {
                    resolve([]);
                })
        });
    }


}