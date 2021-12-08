import React, { useEffect, memo } from 'react';
import { Link } from 'react-router-dom';

import s from './index.module.scss';
const App = () => {
    useEffect(() => {
        Notification.requestPermission((status: string) => {
            console.log('🚀 ~ file: App.tsx ~ line 6 ~ Notification.requestPermission ~ status', status);
        });

        async function getMediaDevices() {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                return devices;
            } catch (error) {
                console.error(error);
                return [];
            }
        }
        return () => {};
    }, []);
    useEffect(() => {
        // Display the current version
        let version = window.appVersion;
        console.log('🚀 ~ file: App.tsx ~ line 62 ~ useEffect ~ version', version);
        const versionEle = document.getElementById('version') as HTMLDivElement;
        versionEle.innerText = version;

        // Listen for messages
        window.ipcRenderer.on('message', function (event: Event, text: string) {
            console.log('🚀 ~ file: App.tsx ~ line 68 ~ text', text);
            const container = document.getElementById('messages') as HTMLDivElement;
            const message = document.createElement('div');
            message.innerHTML = text;
            container.appendChild(message);
        });
        return () => {
            (window as any).ipcRenderer.removeAllListener('message');
        };
    }, []);
    const createNotification = () => {
        const nf = new Notification('标题', {
            body: '这是h5的通知',
            icon: 'https://www.easyicon.net/api/resizeApi.php?id=1081455&size=32',
        });
        return nf;
    };
    const showNotify = () => {
        const nf = createNotification();
        setInterval(createNotification, 10000);

        nf.onclick = () => {
            console.log('点击的通知');
        };

        nf.onclose = () => {
            console.log('🚀 ~ file: App.tsx ~ line 20 ~ showNotify ~ Notification', Notification);
        };
    };

    const startDownload = () => {
        window.ipcRenderer.invoke('startDownload', { update: true }).then(data => {
            console.log('🚀 ~ file: App.tsx ~ line 104 ~ ipcRenderer.invoke ~ data', data);
        });
    };

    return (
        <div className={s.app}>
            <section className={s.top}>
                <div className={s.history}>
                    <Link to="/build">工作区</Link>
                    历史记录
                </div>
                <div className={s.template}>项目模板</div>
            </section>
            <section className={s.bottom}>
                一些通知或者文档链接
                Current version: <span id="version">vX.Y.Z</span>
                <div id="messages">messages:</div>
                <button onClick={showNotify}>显示通知</button>
                <button onClick={startDownload}>开始下载</button>
            </section>
        </div>
    );
};

export default memo(App);
