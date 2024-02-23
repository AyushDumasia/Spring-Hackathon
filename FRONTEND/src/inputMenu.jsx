import './inputMenu.css';
export default function InputMenu(){
    return(
        <div className="formArea">
            <form>
                <h1>Menu</h1>
                <div className='div'>
                    <label htmlFor='time' className='label'>What is this for?</label>
                    <select className = 'dropdown' id = 'time' required>
                        {/* <option>--Select the time--</option> */}
                        <option value='Breakfast'>Breakfast</option>
                        <option value='Lunch'>Lunch</option>
                        <option value='Dinner'>Dinner</option>
                    </select>
                </div>
                <div className='div'>
                    <label htmlFor='menuItems' className='label'>What have you prepared, today?</label>
                    <textarea id = 'menuItems' placeholder='Fuck Off' rows={8} cols={10} required></textarea>
                </div>
                <div className='div'>
                    <label htmlFor='notes' className='label'>Additional notes</label>
                    <textarea id = 'notes' placeholder='Fuck Off' rows={4} cols={10}></textarea>
                </div>
                <a href = '#' className='closure'>Check Previous Menus</a>
                <button className='action'>Done</button>
            </form>
        </div>
    );
}