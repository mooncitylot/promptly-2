import { LitElement, html, css } from 'lit'

class LoadingSpinner extends LitElement {
  static styles = css`
    .spinner {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      animation: spin 4s linear infinite;
      z-index: 1;
    }

    .spinner2 {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      animation: spin2 4s linear infinite;
      z-index: 2;
    }

    .spinnerLogo {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 3;
    }

    .stacked-spinners {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes spin2 {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(-360deg);
      }
    }
  `

  render() {
    return html`<svg width="56" height="56" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <style>
        .spinner_GmWz {
          animation: spinner_Ctle 0.8s linear infinite;
          animation-delay: -0.8s;
        }
        .spinner_NuDr {
          animation-delay: -0.65s;
        }
        .spinner_OlQ0 {
          animation-delay: -0.5s;
        }
        @keyframes spinner_Ctle {
          93.75%,
          100% {
            opacity: 0.2;
          }
        }
      </style>
      <rect class="spinner_GmWz" x="1" y="4" width="6" height="14" fill="#1C1B1F" />
      <rect class="spinner_GmWz spinner_NuDr" x="9" y="4" width="6" height="14" fill="#1C1B1F" />
      <rect class="spinner_GmWz spinner_OlQ0" x="17" y="4" width="6" height="14" fill="#1C1B1F" />
    </svg>`
  }
}

customElements.define('loading-spinner', LoadingSpinner)
export default LoadingSpinner
