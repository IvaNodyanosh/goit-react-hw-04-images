import css from "./Button.module.css"

export const Button = ({incrementPage}) => {
    return <button type="button" className={css.Button} onClick={incrementPage}>Load more</button>
}