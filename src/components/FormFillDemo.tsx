const fields = [
  'title',
  'FirstName',
  'Last Name',
  'email',
  'userName',
  'Gender',
  'Company',
  'phone',
  'address',
  'address2',
  'address3',
  'zip',
  'city',
]

const stateSelect = (
  <select className="mb-8 shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
    <option value="AL">Alabama</option>
    <option value="AK">Alaska</option>
    <option value="AZ">Arizona</option>
    <option value="AR">Arkansas</option>
    <option value="CA">California</option>
    <option value="CO">Colorado</option>
    <option value="CT">Connecticut</option>
    <option value="DE">Delaware</option>
    <option value="DC">District Of Columbia</option>
    <option value="FL">Florida</option>
    <option value="GA">Georgia</option>
    <option value="HI">Hawaii</option>
    <option value="ID">Idaho</option>
    <option value="IL">Illinois</option>
    <option value="IN">Indiana</option>
    <option value="IA">Iowa</option>
    <option value="KS">Kansas</option>
    <option value="KY">Kentucky</option>
    <option value="LA">Louisiana</option>
    <option value="ME">Maine</option>
    <option value="MD">Maryland</option>
    <option value="MA">Massachusetts</option>
    <option value="MI">Michigan</option>
    <option value="MN">Minnesota</option>
    <option value="MS">Mississippi</option>
    <option value="MO">Missouri</option>
    <option value="MT">Montana</option>
    <option value="NE">Nebraska</option>
    <option value="NV">Nevada</option>
    <option value="NH">New Hampshire</option>
    <option value="NJ">New Jersey</option>
    <option value="NM">New Mexico</option>
    <option value="NY">New York</option>
    <option value="NC">North Carolina</option>
    <option value="ND">North Dakota</option>
    <option value="OH">Ohio</option>
    <option value="OK">Oklahoma</option>
    <option value="OR">Oregon</option>
    <option value="PA">Pennsylvania</option>
    <option value="RI">Rhode Island</option>
    <option value="SC">South Carolina</option>
    <option value="SD">South Dakota</option>
    <option value="TN">Tennessee</option>
    <option value="TX">Texas</option>
    <option value="UT">Utah</option>
    <option value="VT">Vermont</option>
    <option value="VA">Virginia</option>
    <option value="WA">Washington</option>
    <option value="WV">West Virginia</option>
    <option value="WI">Wisconsin</option>
    <option value="WY">Wyoming</option>
  </select>
)

const getSimpleLabelAndInput = (fieldName: string) => {
  return (
    <label key={fieldName} className="block text-gray-700 text-sm font-bold mb-2">
      {fieldName}
      <input
        type="text"
        name={fieldName}
        className="shadow appearance-none border rounded w-full py-2 px-3 mb-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </label>
  )
}

const FormFillDemo = () => {
  return (
    <div className="flex items-center flex-col mt-10 m-5 p-5">
      This is a simple form fill page for testing the autofill functionality of your browser or
      password manager. Data is never sent anywhere.
      <div className="w-full max-w-xs mt-10">
        <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {fields.map((f) => getSimpleLabelAndInput(f))}
          <div className="flex flex-col">
            <div className=' className="block text-gray-700 text-sm font-bold mb-2'>State</div>
            {stateSelect}
          </div>
          <div className="flex justify-around">
            <input
              type="reset"
              value="Reset"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            />
            <input
              type="submit"
              value="Submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormFillDemo
