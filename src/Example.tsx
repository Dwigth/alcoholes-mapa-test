import styled from "styled-components";

const ExampleURI = styled.div``;
const ExampleLink = styled.a`
cursor: pointer;
`;

function Example() {
    const uri = '?rfc=XAXX010101000&licenciatario=Micheladas%20El%20Capi&licencia=0000LA2500&domicilio=Manuel%20A.%20Jimenez%20113,%20Centro,%2086800%20Teapa,Tab.&rula=IUAA0000LA2500MSLAP17D549286LOM92D947944EC12345';

    function onUrlClick() {
        const url = new URL(window.location.href);
        window.history.pushState({}, 'Hello', `${url.origin}${uri}`)
        window.dispatchEvent(new PopStateEvent('popstate', { state: {} }));
    }

    return (
        <ExampleURI>
            Mira este ejemplo de <ExampleLink onClick={onUrlClick}>URL</ExampleLink>
        </ExampleURI>
    )
}

export default Example;