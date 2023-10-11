import styled from "styled-components";
import Example from "./Example";

const BadRequestTitle = styled.h2`
color: #888;
`;
function BadRequest() {

    return (
        <>
            <BadRequestTitle>Los parámetros de consulta no están configurados o tienen formato incorrecto</BadRequestTitle>
            <Example />
        </>
    )
}

export default BadRequest;