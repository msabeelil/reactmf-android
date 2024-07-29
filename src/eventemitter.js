

const handleClick = () => {
    console.log('Button clicked, emitting event to Android');
    if (window.Android) {
      window.Android.postMessage('Hello from React');
    } else {
      console.log('Android interface is not available');
    }
  };

  export default handleClick;