import React, { useState } from 'react';
import ReactDom from 'react-dom';
import { IconButton, Button, Popper, Grow, Paper, ClickAwayListener, MenuList, MenuItem } from '@mui/material';
import { HorizontalRule, CropSquare, Close } from '@mui/icons-material';

import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';

import App from './pages/App';
import About from './pages/Build';
import './rem';

import './index.scss';

const { ipcRenderer } = require('electron');


const themeColor = {
    titleFont: '#FFD5A2',
    popperBackground: '#3982CE',
    popperFont: '#FD9151'
}

function Root() {
    const minClick = () => {
        ipcRenderer.send("window-min");
    };

    const maxClick = () => {
        ipcRenderer.send("window-max");
    };

    const closeClick = () => {
        ipcRenderer.send("window-close");
    };
    const [open, setOpen] = useState(false);
    const [visOpen, setVisOpen] = useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);
    const anchorRef2 = React.useRef<HTMLButtonElement>(null);
    return (
        <BrowserRouter>
            <div>
                <nav className="navBar">
                    <div className="navItem">
                        <div className="menuItem">
                            <Button
                                ref={anchorRef}
                                style={{height: '30px', fontSize: '14px'}}
                                aria-controls={open ? 'composition-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={() => setOpen(true)}
                            >
                                <span style={{color: themeColor.titleFont}}>文件(F)</span>
                            </Button>
                            <Popper
                                open={open}
                                anchorEl={anchorRef.current}
                                role={undefined}
                                placement="bottom-start"
                                transition
                                disablePortal
                            >
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{
                                            transformOrigin:
                                            placement === 'bottom-start' ? 'left top' : 'left bottom',
                                        }}
                                    >
                                        <Paper style={{backgroundColor: themeColor.popperBackground}}>
                                            <ClickAwayListener onClickAway={() => setOpen(false)} >
                                                <MenuList
                                                    autoFocusItem={open}
                                                    aria-labelledby="composition-button"
                                                    onKeyDown={() => setOpen(false)}
                                                >
                                                    <MenuItem onClick={() => setOpen(false)}>
                                                        <Link style={{fontSize: '14px', textDecoration: 'none', color: themeColor.popperFont}} to="/build">新建文件</Link>
                                                    </MenuItem>
                                                    <MenuItem onClick={() => setOpen(false)}>
                                                        <Link style={{fontSize: '14px', textDecoration: 'none', color: themeColor.popperFont}} to="/build">打开文件</Link>
                                                    </MenuItem>
                                                    <MenuItem onClick={() => setOpen(false)}>
                                                        <Link style={{fontSize: '14px', textDecoration: 'none', color: themeColor.popperFont}} to="/build">打开文件夹</Link>
                                                    </MenuItem>
                                                    <MenuItem onClick={() => setOpen(false)}>
                                                        <Link style={{fontSize: '14px', textDecoration: 'none', color: themeColor.popperFont}} to="/build">保存</Link>
                                                    </MenuItem>
                                                    <MenuItem onClick={() => setOpen(false)}>
                                                        <Link style={{fontSize: '14px', textDecoration: 'none', color: themeColor.popperFont}} to="/build">另存为</Link>
                                                    </MenuItem>
                                                    <MenuItem onClick={() => setOpen(false)}>
                                                        <Link style={{fontSize: '14px', textDecoration: 'none', color: themeColor.popperFont}} to="/build">设置</Link>
                                                    </MenuItem>
                                                    <MenuItem onClick={() => setOpen(false)}>
                                                        <Link style={{fontSize: '14px', textDecoration: 'none', color: themeColor.popperFont}} to="/build">退出</Link>
                                                    </MenuItem>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </div>
                        <div className="menuItem">
                            <Button
                                ref={anchorRef2}
                                style={{height: '30px', fontSize: '14px'}}
                                aria-controls={visOpen ? 'composition-menu' : undefined}
                                aria-expanded={visOpen ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={() => setVisOpen(true)}
                            >
                                <span style={{color: themeColor.titleFont}}>帮助(H)</span>
                            </Button>
                            <Popper
                                open={visOpen}
                                anchorEl={anchorRef2.current}
                                role={undefined}
                                placement="bottom-start"
                                transition
                                disablePortal
                            >
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{
                                            transformOrigin:
                                            placement === 'bottom-start' ? 'left top' : 'left bottom',
                                        }}
                                    >
                                        <Paper style={{backgroundColor: themeColor.popperBackground}}>
                                            <ClickAwayListener onClickAway={() => setVisOpen(false)}>
                                                <MenuList
                                                    autoFocusItem={visOpen}
                                                    aria-labelledby="composition-button"
                                                    onKeyDown={() => setVisOpen(false)}
                                                >
                                                    <MenuItem onClick={() => setVisOpen(false)}>
                                                        <Link style={{fontSize: '14px', textDecoration: 'none', color: themeColor.popperFont}} to="/">文档</Link>
                                                    </MenuItem>
                                                    <MenuItem onClick={() => setVisOpen(false)}>
                                                        <Link style={{fontSize: '14px', textDecoration: 'none', color: themeColor.popperFont}} to="/">检查更新</Link>
                                                    </MenuItem>
                                                    <MenuItem onClick={() => setVisOpen(false)}>
                                                        <Link style={{fontSize: '14px', textDecoration: 'none', color: themeColor.popperFont}} to="/">关于</Link>
                                                    </MenuItem>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </div>
                    </div>
                    <div>
                        <IconButton onClick={minClick} component="span">
                            <HorizontalRule style={{fontSize: '14px'}}/>
                        </IconButton>
                        <IconButton onClick={maxClick} component="span">
                            <CropSquare style={{fontSize: '14px'}} />
                        </IconButton>
                        <IconButton onClick={closeClick} component="span">
                            <Close style={{fontSize: '16px'}} />
                        </IconButton>
                    </div>
                </nav>
                
                <Switch>
                    <Route exact path="/build">
                        <About />
                    </Route>
                    <Route path="/" exact component={App} />
                    <Redirect from="" to="/" />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

ReactDom.render(<Root />, document.getElementById('root'));
