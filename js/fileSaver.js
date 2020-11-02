

function WriteToFile(passForm) { 
     
    set fso = CreateObject("Scripting.FileSystemObject");  
    set s   = fso.CreateTextFile("/fileSaver.txt", True); 
 
    var firstName = document.getElementById('FirstName'); 
    var lastName  = document.getElementById('lastName'); 
 
    s.writeline("First Name :" + FirstName); 
    s.writeline("Last Name :" + lastName); 
 
    s.writeline("-----------------------------"); 
    s.Close(); 
 } 