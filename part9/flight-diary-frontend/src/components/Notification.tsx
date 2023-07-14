export type NotificationProps = {
  message: string
}

const errorStyle = {
    "color": "red",
    "background": "lightgrey",
    "font-size": "20px",
    "border-style": "solid",
    "border-radius": "5px",
    "padding": "10px",
    "margin-bottom": "10px",
    "width": "fit-content"
}

export const Notification = (props: NotificationProps) => {
  return props.message? (<div style={errorStyle}>{props.message}</div>) : null
}
