import hljs from "highlight.js"
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';


export const compile = (value) => {
    let parsed_string = value
    const header_pattern = /#+ .+/g 
    const code_pattern = /```.+```/g
    const quote_pattern = />+ .+/g
    const precode_pattern = /```[\s\S]*?```/g
    const link_pattern = /\[.+\]\(.+\)/g
    const strong_pattern = /\*.+\*/g
    
    const header_string = value.match(header_pattern)? value.match(header_pattern):[]
    const code_string = value.match(code_pattern)? value.match(code_pattern):[]
    const quote_string = value.match(quote_pattern)? value.match(quote_pattern):[] 
    const precode_string = value.match(precode_pattern)? value.match(precode_pattern):[] 
    const link_string = value.match(link_pattern)? value.match(link_pattern):[]
    const strong_string = value.match(strong_pattern)? value.match(strong_pattern):[]


    console.log(header_string)

    for (let i = 0; i < header_string.length; i++)parsed_string = parsed_string.replaceAll(header_string[i], `<span class="md-header-block">${header_string[i]}</span>`)
    for (let i = 0; i < code_string.length; i++) parsed_string = parsed_string.replaceAll(code_string[i], `<span class="md-code-inline">${code_string[i]}</span>`)
    for(let i = 0; i < quote_string.length; i++) parsed_string = parsed_string.replaceAll(quote_string[i], `<span class="md-quote-block">${quote_string[i]}</span>`)
    for(let i = 0; i < link_string.length; i++) parsed_string = parsed_string.replaceAll(link_string[i], `<span class=md-link-inline>${link_string[i]}</span>`)
    for(let i = 0; i < strong_string.length; i++) parsed_string = parsed_string.replaceAll(strong_string[i], `<span class="md-strong-inline">${strong_string[i]}</span>`)
    for(let i = 0; i < precode_string.length; i++) {
        const code_quote_stiring = precode_string[i].match(/```.+|```/g)
        const code_stiring = precode_string[i].replaceAll(/```.+|```/g, "")
        let string = ""
        try {
            string = hljs.highlight(code_stiring, {language: get_language_from_block(precode_string[i])}).value
        } catch (e) {
            string =  hljs.highlight(code_stiring, {language: "text"}).value
        }
        console.log(hljs.highlightAuto(code_stiring).value) 
        parsed_string = parsed_string.replaceAll(
            precode_string[i],  
            `${code_quote_stiring[0]}${
                string
            }${code_quote_stiring.slice(-1)[0]}`
            )        
    }
    return parsed_string
    
}