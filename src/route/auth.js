// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

// Підключіть файли роутів
const { User } = require('../class/user')
const { Confirm } = require('../class/confirm')

// Підключіть інші файли роутів, якщо є

User.create({
    email: 'test@gmail.com',
    password: 123,
    role: 1,
})

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


router.post('/signup', function (req, res) {

    const { email, password, role } = req.body;

    console.log(req.body)

    if (!email || !password || !role) {
        return res.status(400).json({
            message: 'Помилка, обовязкові поля відсутні',
        })
    }

    try {
        const user = User.getByEmail(email);

        if (user) {
            return res.status(400).json({
                message: 'Такий користувач вже існує'
            })
        }
        User.create({ email, password, role })


        return res.status(200).json({
            message: 'Користувач успішно зареєстрований',
        })
    } catch (err) {
        return res.status(400).json({
            message: 'Помилка створення користувача',
        })
    }
})


router.get('/recovery', function (req, res) {
    // res.render генерує нам HTML сторінку

    // ↙️ cюди вводимо назву файлу з сontainer
    res.render('recovery', {
        // вказуємо назву контейнера
        name: 'recovery',
        // вказуємо назву компонентів
        component: ['back-button', 'field'],

        // вказуємо назву сторінки
        title: 'Recovery page',
        // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

        // вказуємо дані,
        data: {

        },
    })
    // ↑↑ сюди вводимо JSON дані
})

router.post('/recovery', function (req, res) {
    // res.render генерує нам HTML сторінку
    const { email } = req.body;
    console.log(email);
    if (!email) {
        return res.status(400).json({
            message: 'Помилка, Обовязкові поля відсутні'
        })
    }

    try {
        const user = User.getByEmail(email);
        if (!user) {
            return res.status(400).json({
                message: 'Користувач з таким email не існує'
            })
        }


        Confirm.create(email)

        return res.status(200).json({
            message: 'Код, для відновлення паролю відправлено'
        })

    } catch (e) {
        return res.status(400).json({
            message: e.message,
        })
    }


})


router.get('/recovery-confirm', function (req, res) {
    // res.render генерує нам HTML сторінку

    // ↙️ cюди вводимо назву файлу з сontainer
    res.render('recovery-confirm', {
        // вказуємо назву контейнера
        name: 'recovery-confirm',
        // вказуємо назву компонентів
        component: ['back-button', 'field', 'field-password'],

        // вказуємо назву сторінки
        title: 'Recovery confirm page',
        // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

        // вказуємо дані,
        data: {

        },
    })
    // ↑↑ сюди вводимо JSON дані
})


router.post('/recovery-confirm', function (req, res) {
    const { password, code } = req.body;
    console.log(password, code)

    if (!password || !code) {
        return res.status(400).json({
            message: 'Помилка, Обовязкові поля відсутні'
        })
    }


    try {

        const email = Confirm.getData(Number(code))
        if (!email) {
            return res.status(400).json({
                message: 'Такого коду не існує',
            })
        }

        const user = User.getByEmail(email)

        if (!user) {
            return res.status(400).json({
                message: 'Такого користувача не існує',
            })
        }

        user.password = password;
        console.log(user);

        return res.status(200).json({
            message: 'Пароль змінено',
        })

    } catch (err) {
        return res.status(400).json({
            message: e.message,
        })
    }


})

// Експортуємо глобальний роутер
module.exports = router
