import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import './style.sass';

let chatsOptions = {
    header: {
        text: 'User',
        menu: 'dots',
        avatar: {src: '/', size:'_small'},
        contextMenu: {
            type: 'header',
            items: [
                {type: 'header', text: 'Добавить пользователя', img: '/icons/plus.svg', modal: 'addUser'},
                {type: 'header', text: 'Удалить пользователя', img: '/icons/plus.svg', mod: '_rotate45', modal: 'deleteUser'}
            ],
        }
    },
    attachContext: {
        contextMenu: {
            type: 'attach',
            items: [
                {type: 'attach', text: 'Фото или Видео', img: '/icons/picture.svg', modal: 'picture'},
                {type: 'attach', text: 'Файл', img: '/icons/file.svg', modal: 'file'},
                {type: 'attach', text: 'Локация', img: '/icons/location.svg', modal: 'location'}
            ],
        }
    },
    modalContext: {
        hidden: true,
        type: 'editChat',
        mode: 'blur',
        changeUser: {
            add: false,
            del: false
        },
        changeAttachment: {
            pic: false,
            file: false,
            loc: false
        }
    },
    
    stubContainer: 'Здесь будет лента чата',
    chatsContext: {stubChats: 'Здесь будет список чатов'}
}

const pages = {
    'login' : [Pages.LoginPage],
    'registration' : [Pages.RegisterPage],
    'chats' : [
        Pages.ChatsPage, 
        chatsOptions
    ],
    'profile': [
        Pages.ProfilePage,
        {
            header: {
                text: 'Профиль',
            },
            content: {
                src: '/',
                size: 'big'
            },
            chatsContext: {stubChats: 'Здесь будет список чатов'},
        }
    ],
    'editPassword': [Pages.EditPasswordPage]
}

Object.entries(Components).forEach(([name, component]) => {
    Handlebars.registerPartial(name, component);
})

function navigate(page) {
    const [sourse, data] = pages[page];
    if (sourse) {
        let root = document.querySelector('#root');
    
        root.innerHTML = Handlebars.compile(sourse)(data);
    }
}


document.addEventListener('DOMContentLoaded', () => navigate('login'));

document.addEventListener('click', (event) => {
    const page = event.target.getAttribute('page');
    const contextMenu = event.target.getAttribute('contextmenu');
    const currentModal = event.target.getAttribute('current-modal');

    if (page) {
        if (page === 'chats') {
            chatsOptions.modalContext.hidden = true;
        }

        navigate(page);
        event.preventDefault();
        event.stopImmediatePropagation();
    }

    if (contextMenu === 'changeUser') {
        let menu = document.querySelector('.ContextMenu_header');

        menu.classList.toggle('ContextMenu_header_hidden');
    } else if (contextMenu === 'selectAttachment') {
        let menu = document.querySelector('.ContextMenu_attach');

        menu.classList.toggle('ContextMenu_attach_hidden');
    }

    if (currentModal) {
        chatsOptions.modalContext.hidden = false;

        if (currentModal === 'addUser') {
            chatsOptions.modalContext.text = 'Добавить пользователя';
            changeModal('add', 'changeUser', chatsOptions.modalContext);
        }

        if (currentModal === 'deleteUser') {
            chatsOptions.modalContext.text = 'Вы точно хотите удалить чат?';
            changeModal('del', 'changeUser', chatsOptions.modalContext);
        }

        if (currentModal === 'picture') {
            chatsOptions.modalContext.text = 'Выбрать фото';
            changeModal('pic', 'changeAttachment', chatsOptions.modalContext);
        }

        if (currentModal === 'file') {
            chatsOptions.modalContext.text = 'Выбрать файл';
            changeModal('file', 'changeAttachment', chatsOptions.modalContext);
        }

        if (currentModal === 'location') {
            chatsOptions.modalContext.text = 'Выбрать геопозицию';
            changeModal('loc', 'changeAttachment', chatsOptions.modalContext);
        }

        navigate('chats');
    }
});

let prevAction = null;

const changeModal = (cur, action, data) => {

    if (prevAction !== null) {
        data[prevAction.action][prevAction.cur] = false;
    }
    
    for (let item in data[action]) {
        data[action][item] = false;
    }

    data[action][cur] = true;
    prevAction = {action, cur};
}
