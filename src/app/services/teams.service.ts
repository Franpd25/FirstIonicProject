import { Injectable } from '@angular/core';
import {
  AngularFirestore, AngularFirestoreCollection,
  DocumentSnapshot,Query, QueryDocumentSnapshot
} from '@angular/fire/compat/firestore'
import { Teams } from '../model/teams';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private lastDoc : QueryDocumentSnapshot<any>;
  private dbPath: string = 'teams';
  private dbRef: AngularFirestoreCollection<any>
  constructor(private db: AngularFirestore) {
    this.dbRef = this.db.collection(this.dbPath);
  }

  public async addTeams(team: Teams): Promise<Teams> {
      const { id, ...t } = team;
      let newTeam = await this.dbRef.add(t);
      team.id = newTeam.id
      return team;
  }

  public removeTeam(id): Promise<void> {
    return this.dbRef.doc(id).delete();
  }

  public async getTeams(refreshing?:boolean):Promise<Teams[]> {
    let team:Teams[] = []
    let r;
    if(refreshing || this.lastDoc == null){
      this.lastDoc = null;
      r = await this.dbRef.ref.orderBy('name')
              .limit(10).get();
    }else{
      r = await this.dbRef.ref.orderBy('name')
              .startAfter(this.lastDoc)
              .limit(10).get();
    }
    r.docs.forEach(d=>{
      this.lastDoc = d;
      team.push({id:d.id,...d.data()});
    })
    return team;
  }

  public async getTeam(id): Promise<Teams> {
        let t = await this.dbRef.doc(id).get().toPromise();
        return {id:t.id,...t.data()};
  }

  public async updateTeam(team):Promise<void> {
    if(!team.id) return;
    const {id,...t} = team;
    await this.dbRef.doc(team.id).set(t);
  }
}
