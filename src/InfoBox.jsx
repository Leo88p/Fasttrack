function InfoBox({text, x, y}) {
    return (
        <div className = "infoBox">
            <p>{text}</p>
            <p>X: {x}</p>
            <p>Y: {y}</p>
        </div>
    )
}
export default InfoBox