import {render,screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import App from "./App";
import Header from "./Header";
import EmojiResults from "./EmojiResults";
import filterEmoji from "./filterEmoji"
import SearchInput from "./SearchInput";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});

describe(("emoji app test"), () => {
let Header, EmojiResults,SearchInput;
  beforeEach(() => {
    render(<App/>)
    render(<Header/>)
    Header = screen.getByText("Emoji Search")
    EmojiResults = screen.getByText("Kissing")
    
  })

  test("header test", () => {
    expect(Header).toBeInTheDocument()
  })
  test("emoji list",() => {
    const items = screen.getAllByText(/click to copy emoji/i)
    expect(items.length).toEqual(20)
  })
  test("filter emoji test", () => {
    const tryEmoji = "Kissing"
    SearchInput = screen.getByTitle("input")
    userEvent.type(SearchInput, tryEmoji)
    expect(screen.getAllByText(tryEmoji).toBeInTheDocument())
  })
  test("copied emoji test", () => {
    const items = screen.getByText(/Kissing/i)
    let text ="Kissing"
    userEvent.click(items)
    expect(items).toHaveTextContent(text)
  })

})