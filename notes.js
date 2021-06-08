const fs=require('fs')
const chalk=require('chalk')

const addNote = (title,body)=>{
    const notes= loadNotes()
    const duplicateNotes= notes.find((note) => note.title ===title)
    
    //const duplicateNotes= notes.filter(function(note){
     //   return note.title ===title
    //})
    if(duplicateNotes.length===0)
    {
    notes.push({
        title: title,
        body: body
    })
    saveNotes(notes)
    console.log(chalk.green.inverse('New note added!!!'))
    }
    else
    {
        console.log(chalk.red.inverse('Note title taken!!!'))
    }
}



const saveNotes= (notes)=>{
     const dataJSON=JSON.stringify(notes)
     fs.writeFileSync('notes.json',dataJSON)
}

const loadNotes=()=>{
     try{
         const dataBuffer=fs.readFileSync('notes.json')
     const dataJSON=dataBuffer.toString()
     return JSON.parse(dataJSON)
     }catch(e){
         return []
     }

     
}

const removeNote=(title)=>{
   //console.log(title)
   const notes=loadNotes()
    before=notes.length
   const notesToKeep=notes.filter((note)=>note.title!=title)
   after=notesToKeep.length
   if(before>after){
       console.log(chalk.green.inverse('Note removed!'))
       saveNotes(notesToKeep)
   }
   else
   {
       console.log(chalk.red.inverse('No note found!'))
   }
}

const listNote=()=>{
    console.log(chalk.green.inverse('Your Notes:'))
    const notes=loadNotes()
    notes.forEach((note)=>{
        console.log(note.title)
    })
}

const readNote=(title)=>{
    const notes= loadNotes()
    const duplicateNotes= notes.find((note) => note.title ===title)
    if(duplicateNotes){
        console.log(chalk.green.inverse(duplicateNotes.title))
        console.log(duplicateNotes.body)
    }
    else
    {
        console.log(chalk.red.inverse('Note not found!'))
    }
}

module.exports={
    addNote: addNote,
    removeNote: removeNote,
    listNote : listNote,
    readNote: readNote
}