import React from 'react'
import ContentList from '../../creator/content/ContentList'
import ContentCreationBar from '../../creator/CreateContent/CreateContentBar'
import CreateContent from '../../creator/CreateContent/CreateContent'
// import CreatorHeader from '../../creator/CreatorHeader';

function ContentPage() {
  return (
    <div>
        <CreateContent />
        {/* <CreatorHeader /> */}
        <ContentList />
        {/* <Footer /> */}
    </div>
  )
}

export default ContentPage