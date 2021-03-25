import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';

import { HomeComponent } from './components/home.component';
import { UserEditComponent } from './components/user-edit.component';
import { ArtistListComponent } from './components/artist-list.component';
import { ArtistAddComponent } from './components/artist-add.component';
import { ArtistEditComponent } from './components/artist-edit.component';
import { ArtistDetailComponent } from './components/artist-detail.component';
import { AlbumAddComponent } from './components/album-add.component';
import { AlbumEditComponent } from './components/album-edit.component';
import { AlbumDetailComponent } from './components/album-detail.component';
import { SongAddComponent } from './components/song-add.component';
import { SongEditComponent } from './components/song-edit.component';
import { PlayerComponent } from './components/player.component';
import { CodigoDetailComponent } from './components/codigo-detail.component';
import { CodigoAddComponent } from './components/codigo-add.component';
import { CodigoEditComponent } from './components/codigo-edit.componet';
import { SongListComponent } from './components/song-list.component';
import { AlbumListComponent } from './components/album-list.component';

import { UserListComponent } from './components/user-list.component';
import { UserListEditComponent } from './components/user-list-edit.component';
import { FilterPipe } from './pipes/filter.pipe';
// import { SongUserComponent } from './components/song-user.component';
import { SongQrComponent } from './components/song-qr.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserEditComponent,
    ArtistListComponent,
    ArtistAddComponent,
    ArtistEditComponent,
    ArtistDetailComponent,
    AlbumAddComponent,
    AlbumEditComponent,
    AlbumDetailComponent,
    SongAddComponent,
    SongEditComponent,
    PlayerComponent,
    CodigoDetailComponent,
    CodigoAddComponent,
    CodigoEditComponent,
    SongListComponent,
    AlbumListComponent,
    UserListComponent,
    UserListEditComponent,
    FilterPipe,
    // SongUserComponent,
    SongQrComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
