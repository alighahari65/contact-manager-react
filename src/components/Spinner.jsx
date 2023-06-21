import SpinnerGif from '../../src/assets/Spinner.gif'

const Spinner = () => {
    return (  
        <>
            <img src={SpinnerGif} className='d-block mx-auto' style={{width:'10em'}} />
        </>
    );
}
 
export default Spinner;
