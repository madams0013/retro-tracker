import React from 'react'
import "./index.css"

class SelectBar extends React.Component {

    state = {
        date: {
            month: "01",
            day: "01",
            year: "2020",
        }
    }

    onChange = (e) => {
        let name = e.target.name;
        let newDate = this.state.date;
        newDate[name] = e.target.value;
        this.setState({
            date: newDate,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.submitDate(this.state.date);
    }

    // TODO: add conditional options for day dropdown depending on month and year (leap year)
    render() {
        return (
            <form onSubmit={this.handleSubmit} className="selectBar">
                
                    <label htmlFor="dateselect">
                        Choose a day:
                    </label>
                    
                    <select 
                        className="selectBox"
                        id="month" 
                        name="month" 
                        value={this.state.date.month}
                        onChange={this.onChange}>
                        <option value="01">January</option>
                        <option value="02">February</option>
                        <option value="03">March</option>
                        <option value="04">April</option>
                        <option value="05">May</option>
                        <option value="06">June</option>
                        <option value="07">July</option>
                        <option value="08">August</option>
                        <option value="09">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                    
                    <select 
                        className="selectBox"
                        id="day" 
                        name="day" 
                        value={this.state.date.day}
                        onChange={this.onChange}>
                        <option value="01">1</option>
                        <option value="02">2</option>
                        <option value="03">3</option>
                        <option value="04">4</option>
                        <option value="05">5</option>
                        <option value="06">6</option>
                        <option value="07">7</option>
                        <option value="08">8</option>
                        <option value="09">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                    </select>
                    
                    <select 
                        className="selectBox"
                        id="year" 
                        name="year"
                        value={this.state.date.year}
                        onChange={this.onChange}>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                        {/* <option value="2021">2021</option> */}
                    </select>
                    
                    <button className="selectBarSubmit">Submit</button>

            </form>
        )
    }
}

export default SelectBar;