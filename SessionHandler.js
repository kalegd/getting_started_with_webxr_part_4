import { VRButton } from './VRButton.js';
import { PointerLockControls } from './PointerLockControls.js';
import { DeviceOrientationControls } from './DeviceOrientationControls.js';
import global from './global.js';

export default class SessionHandler {
    constructor(renderer, camera) {
        if(global.deviceType == "XR") {
            document.body.appendChild(VRButton.createButton(renderer));
        } else if(global.deviceType == "POINTER") {
            this._setupPointerStartButton(camera);
        } else if(global.deviceType == "MOBILE") {
            this._setupMobileStartButton(camera);
        }
    }

    _setupMobileStartButton(camera) {
        this._div = document.createElement('div');
        this._button = document.createElement('button');
        this._button.innerText = "TAP TO START";
        this._stylizeElements();
        this._div.appendChild(this._button);
        document.body.appendChild(this._div);

        this._button.addEventListener('touchend', () => {
            this._controls = new DeviceOrientationControls(camera)
            this._div.style.display = "none";
        });
    }

    _setupPointerStartButton(camera) {
        this._div = document.createElement('div');
        this._button = document.createElement('button');
        this._button.innerText = "CLICK TO START";
        this._stylizeElements();
        this._div.appendChild(this._button);
        document.body.appendChild(this._div);

        this._controls = new PointerLockControls(camera, this._button);
        this._button.addEventListener('click', () => { this._controls.lock(); });
        this._controls.addEventListener('lock', () => {
            this._div.style.display = "none";
        });
        this._controls.addEventListener('unlock', () => {
            this._div.style.display = "block";
        });
    }

    _stylizeElements() {
        this._div.style.position = 'absolute';
        this._div.style.bottom = '20px';
        this._div.style.width = '100%';
        this._button.style.padding = '12px';
        this._button.style.border = '1px solid #fff';
        this._button.style.borderRadius = '4px';
        this._button.style.background = 'rgba(0,0,0,0.1)';
        this._button.style.color = '#fff';
        this._button.style.font = 'normal 13px sans-serif';
        this._button.style.textAlign = 'center';
        this._button.style.opacity = '0.5';
        this._button.style.outline = 'none';
        this._button.onmouseenter = () => { this._button.style.opacity = '1.0'; };
        this._button.onmouseleave = () => { this._button.style.opacity = '0.5'; };
    }

    update() {
        if(this._controls && this._controls.enabled) {
            this._controls.update();
        }
    }
}
