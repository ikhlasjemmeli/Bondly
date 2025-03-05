import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {
isContactOpen = false;
isSettingsOpen =false;
private ConversationsSubject = new BehaviorSubject<any[]>([]);
Conversations$ = this.ConversationsSubject.asObservable();
Conversations :any;

private ConversationBetweenTwoUsersSubject = new BehaviorSubject<any[]>([]);
ConversationBetweenTwoUsers$ = this.ConversationBetweenTwoUsersSubject.asObservable();
ConversationBetweenTwoUsers :any;

baseUrl:string ="https://localhost:7166/api/Conversation/"

private selectedConversationId = new BehaviorSubject<string | null>(null);
currentConversationId = this.selectedConversationId.asObservable();


  constructor(private http :HttpClient) { }

  private colorSource = new BehaviorSubject<string>('#0000FF'); 
  currentColor = this.colorSource.asObservable();


  private emojiSource = new BehaviorSubject<string>('thump_up'); 
  currentEmoji = this.emojiSource.asObservable();

  private NamesSource = new BehaviorSubject<string>(''); 
  currentName = this.NamesSource.asObservable();

  setColor(color: string) {
    this.colorSource.next(color);
  }
  setEmoji(emoji: string) {
    this.emojiSource.next(emoji);
  }

  setName(name: string) {
    this.NamesSource.next(name);
  }

  selectConversation(id: string) {
    this.selectedConversationId.next(id);
    
  }


  GetConversationBetweenTwoUsers(userId:string){
    const connectedUserJson = localStorage.getItem('ConnectedUser');
    let id: any;
    if (connectedUserJson) {
      const connectedUser = JSON.parse(connectedUserJson);
      id = connectedUser.id;
    }
    this.http.get(`${this.baseUrl}GetConversationBetWeenTwoUsers?user1id=${id}&user2id=${userId}`).subscribe( 
      (data:any)=>{
        this.ConversationBetweenTwoUsersSubject.next(data);
      
      }, error=>{
        console.log("error:", error.error)
      }
    )
  }


  UpdateAllConversations(){
    {
      const connectedUserJson = localStorage.getItem('ConnectedUser');
      let id: any;
      if (connectedUserJson) {
        const connectedUser = JSON.parse(connectedUserJson);
        id = connectedUser.id;
      }
      this.http.get(`${this.baseUrl}GetAllConversationByUserId?UserId=${id}`).subscribe( 
        (data:any)=>{
          this.ConversationsSubject.next(data);
       
        }, error=>{
          console.log("error:", error.error)
        }
      )
    }
  }
  GetAllConversations(){
    const connectedUserJson = localStorage.getItem('ConnectedUser');
    let id: any;
    if (connectedUserJson) {
      const connectedUser = JSON.parse(connectedUserJson);
      id = connectedUser.id;
    }
    this.http.get(`${this.baseUrl}GetAllConversationByUserId?UserId=${id}`).subscribe( 
      (data:any)=>{
        this.ConversationsSubject.next(data);
        this.selectedConversationId.next(data[0].user2Id);
      }, error=>{
        console.log("error:", error.error)
      }
    )
  }


  SendMessage(receiverId:string, content:string, isEmoji:boolean,){
    const connectedUserJson = localStorage.getItem('ConnectedUser');
    let senderId: any;
    if (connectedUserJson) {
      const connectedUser = JSON.parse(connectedUserJson);
      senderId = connectedUser.id;
   
    const Message ={senderId:senderId,receiverId:receiverId,content:content,isEmoji:isEmoji}
    this.http.post<any[]>(`${this.baseUrl}send`,Message).subscribe(data=>{
      console.log("success");
      this.UpdateAllConversations()
    },
  error=>{
    console.log(error.error)
  })
  }
  }


  ChangeColor(conversationId:string, color:string) :void{
  this.http.put<any[]>(`${this.baseUrl}ChangeColor?conversationId=${conversationId}&color=${color}`,{}).subscribe(data=>{
    console.log("color changed")
  },
   error =>{
  console.log(error.error)
})
  }

  ChangeEmoji(conversationId:string, emoji:string) :void{
    this.http.put<any[]>(`${this.baseUrl}ChangeEmoji?conversationId=${conversationId}&emoji=${emoji}`,{}).subscribe(data=>{
      console.log("emoji changed")
    },
     error =>{
    console.log(error.error)
  })
    }


    MarkAsViewed(conversationId:string, userId:string) :void{
      this.http.put<any[]>(`${this.baseUrl}MarkAsViewed?conversationId=${conversationId}&userId=${userId}`,{}).subscribe(data=>{
        console.log("Mark as viewed")
        this.UpdateAllConversations();
      },
       error =>{
      console.log(error.error)
    })
      }
}
