// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

// Підключіть файли роутів
const { User } = require('../class/user')
// Підключіть інші файли роутів, якщо є



// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/signup', function (req, res) {
    // res.render генерує нам HTML сторінку

    // ↙️ cюди вводимо назву файлу з сontainer
    res.render('signup', {
        // вказуємо назву контейнера
        name: 'signup',
        // вказуємо назву компонентів
        component: ['back-button', 'field', 'field-password', 'field-checkbox', 'field-select'],

        // вказуємо назву сторінки
        title: 'Signup page',
        // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

        // вказуємо дані,
        data: {
            role: [
                { value: User.USER_ROLE.USER, text: 'Користувач' },
                { value: User.USER_ROLE.ADMIN, text: 'Адміністратор' },
                { value: User.USER_ROLE.DEVELOPER, text: 'Розробник' },
            ],
        },
    })
    // ↑↑ сюди вводимо JSON дані
})







// Експортуємо глобальний роутер
module.exports = router
