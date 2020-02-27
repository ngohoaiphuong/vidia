const iziToast = require('izitoast/dist/js/iziToast')

export class NoticeMessage {
  private content = {
    message: '',
    position: 'topRight',
    timeout: 3000
  }

  constructor() {
  }

  error(message: any, callBack = undefined) {
    iziToast.error(this.generateMessage(message, callBack));
  }

  notice(message: any, callBack = undefined) {
    iziToast.info(this.generateMessage(message, callBack));    
  }

  warning(message: any, callBack = undefined) {
    iziToast.warning(this.generateMessage(message, callBack));    
  }

  success(message: any, callBack = undefined) {
    iziToast.success(this.generateMessage(message, callBack));    
  }

  private generateMessage(message: any, callBack = undefined) {
    return { ...this.content, ...{ 
        message: message,
        onClosed: callBack ? callBack() : () => {}
      } 
    }
  }    
}