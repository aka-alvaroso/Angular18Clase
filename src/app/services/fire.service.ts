import { inject, Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Recipe } from '../model/recipe';

@Injectable({
  providedIn: 'root',
})
export class FireService {
  firestore = inject(AngularFirestore);
  itemCollection!: AngularFirestoreCollection<any>;
  items$!: Observable<any[]>;
  auth = inject(AuthService);

  constructor() {
    this.itemCollection = this.firestore.collection(
      `users/${this.auth.userData.uid}/recipes`
    );
    this.items$ = this.itemCollection.valueChanges();
  }

  createRecipe(recipe: Recipe): Promise<DocumentReference<any>> {
    return this.itemCollection.add(recipe);
  }

  deleteRecipe(id: string): Promise<void> {
    return this.itemCollection.doc(id).delete();
  }

  editRecipe(id: string, recipe: Recipe): Promise<void> {
    return this.itemCollection.doc(id).update(recipe);
  }

  getRecipesById(id: string): Observable<Recipe> {
    console.log('GET RECIPES BY ID');
    console.log(id);

    return this.itemCollection.doc(id).valueChanges();
  }

  //update to do
  getRecipes(): Observable<Recipe[]> {
    return this.items$;
  }

  getRecipesWithID() {
    return this.itemCollection.snapshotChanges().pipe(
      map((actions: any) =>
        actions.map((a: any) => {
          const data = a.payload.doc.data() as Recipe;
          const id = a.payload.doc.id; // Obtener el ID del documento
          return { id: id, ...data }; // Devolver el ID junto con los datos
        })
      )
    );
  }
}
