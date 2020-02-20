import { LightningElement, api} from 'lwc';


export default class BaseLwcModal extends LightningElement {

	@api useBackdrop = false;
	@api modalSize = '';
	@api hideCancel = false;

	static delegatesFocus = true;

	renderedCallback() {
		this.setFocusToModal();
	}

	handleKeyDown(e) {
		const KEY_TAB = 9;
		const KEY_ESC = 27;

		switch(e.keyCode) {
			case KEY_TAB:
				if(this.focusableEls.length === 1) {
					e.preventDefault();
					break;
				}
				if(e.shiftKey) {
					this.handleBackwardTab(e);
				} else {
					this.handleForwardTab(e);
				}
				break;
			case KEY_ESC:
				this.closeModal();
				break;
			default:
				break;
		}
	}

	handleBackwardTab(e) {
		if(this.template.activeElement === this.firstFocusableEl) {
			e.preventDefault();
			this.lastFocusableEl.focus();
		}
	}

	handleForwardTab(e) {
		if(this.template.activeElement === this.lastFocusableEl) {
			e.preventDefault();
			this.firstFocusableEl.focus();
		}
	}

	setFocusToModal() {
		var focusableEls = this.template.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
		this.focusableEls = Array.prototype.slice.call(focusableEls);
		this.firstFocusableEl = this.focusableEls[0];
		this.lastFocusableEl = this.focusableEls[this.focusableEls.length - 1];
		this.firstFocusableEl.focus();
	}

	blockFocusLeavingModal() {
	}

	closeModal() {
		this.dispatchEvent(new CustomEvent('closemodal'));
	}

	get modalClass(){
		if(this.modalSize === 'medium'){
			return 'slds-modal slds-fade-in-open slds-modal_medium modalWrapper';
		}else if(this.modalSize === 'large'){
			return 'slds-modal slds-fade-in-open slds-modal_large modalWrapper';
		}
		return 'slds-modal slds-fade-in-open slds-modal_small modalWrapper';
	}
}