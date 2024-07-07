import { render, screen } from '@testing-library/react';
import App from './app/App';
import { FormContextProvider } from './components/Context';
import SubmitButton from './components/SubmitButton';

/* 
 * Components 
 */
describe("testing components", () => {

  test("by wrapping with form context", () => {
    render(
      <App>
        <FormContextProvider>
          <form>
            <input name='one' type='text' value='set' />
            <input name='two' type='text' value='set' />
          </form>
          <form>
            <button 
              type='submit'
            ></button>
          </form>
        </FormContextProvider>
      </App>
    );

    expect();
  });


  test("by rendering submit button", () => {

    const [status, setStatus] = useState('fail');
    const updateStatus = () => {
      setStatus('success');
    };

    render(
      <div>
        <p data-testid='submit-status'>{status}</p>
        <form onSubmit={updateStatus}>
          <SubmitButton text='test' data-testid='submit-button' />
        </form>
      </div>
    );

    const button = screen.queryByTestId("submit-button");
    button.simulate('click');
    const substat = screen.queryByText("success");

    expect(button.toBeInTheDocument());
    expect(substat.toBeInTheDocument());

  });


  test("by rendering load spinner", () => {
    render(
      <div>

      </div>
    );

    expect();
  });


  test("by rendering patient details", () => {
    render(
      <div>
        <PatientDetails data-testid="patient-details" />
      </div>
    );

    const details = screen.queryByTestId("patient-details");
    expect(details.toBeInTheDocument());

  });


  test("by rendering vital signs", () => {
    render(
      <div>

      </div>
    );

    expect();
  });


  test("by rendering provider's notes", () => {
    render(
      <div>

      </div>
    );

    expect();
  });


  test("by rendering orders", () => {
    render(
      <div>

      </div>
    );

    expect();
  });

});


/* 
 * Pages
 */
describe("testing pages", () => {

  test("by rendering login page", () => {
    const login = render(
      <App>
        <Login />
      </App>
    );
    
    expect();
  });


  test("by rendering search page", () => {
    const search = render(
      <App>
        <Search />
      </App>
    );

    const element = screen.getByTestId("Search");
    expect(() => {});
    
    expect(element.not.toBeNull());

  });


  test("by rendering results page", () => {
    const results = render(
      <App>
        <Results />
      </App>
    );

    expect();
  });


  test("by rendering view page", () => {
    const view = render(
      <App>
        <View />
      </App>
    );

    expect();
  });

});


/* 
 * Routes 
 */
describe("testing routes", () => {

  test("from login to search", () => {
    render(
      <div>

      </div>
    );

    expect();
  });


  test("from any page to login", () => {
    render(
      <div>

      </div>
    );

    expect();
  });


  test("from search to results", () => {
    render(
      <div>

      </div>
    );

    expect();
  });
  

  test("from results to search", () => {
    render(
      <div>
        
      </div>
    );

    expect();
  });


  test("from results to view", () => {
    render(
      <div>

      </div>
    );

    expect();
  });


  test("from view to search", () => {
    render(
      <div>

      </div>
    );

    expect();
  });


  test("from view to results", () => {
    render(
      <div>

      </div>
    );

    expect();
  });

});