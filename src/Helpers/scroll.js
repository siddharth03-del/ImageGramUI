export function scroll(chatBox){
    if(chatBox.current.scrollHeight - Math.abs(chatBox.current.scrollTop) != chatBox.current.clientHeight){
        chatBox.current.scrollTo({
            top: chatBox.current.scrollHeight,
            behavior: 'smooth'
        });
        
    }
}